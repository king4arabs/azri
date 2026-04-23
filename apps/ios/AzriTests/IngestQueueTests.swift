// AzriTests/IngestQueueTests.swift

import XCTest
@testable import AzriShared

private actor RecordingClient: IngestPosting {
    var calls: Int = 0
    var fail: Bool = false
    func setFail(_ value: Bool) { fail = value }

    func post(events: [BiosignalBatchEvent], batchId: UUID, sentAt: Date) async throws {
        calls += 1
        if fail {
            throw IngestError.http(status: 500, bodySnippet: "synthetic")
        }
    }
}

final class IngestQueueTests: XCTestCase {
    func tempFile() -> URL {
        URL(fileURLWithPath: NSTemporaryDirectory())
            .appendingPathComponent("azri-queue-\(UUID().uuidString).json")
    }

    func makeEvent() -> BiosignalBatchEvent {
        BiosignalBatchEvent(
            eventId: UUID(),
            occurredAt: Date(),
            organizationId: UUID(),
            patientId: UUID(),
            source: EventSource(deviceKind: .iosWatch),
            kind: .heartRate,
            unit: .bpm,
            samples: [BiosignalSample(at: Date(), value: 78)],
            samplingHz: 1
        )
    }

    func testEnqueueAndFlushDeliversAllEvents() async throws {
        let client = RecordingClient()
        let queue = IngestQueue(
            config: .init(fileURL: tempFile(), maxBatchSize: 10),
            client: client
        )
        await queue.enqueue([makeEvent(), makeEvent(), makeEvent()])
        let delivered = await queue.flush()
        XCTAssertEqual(delivered, 3)
        let depth = await queue.depth()
        XCTAssertEqual(depth, 0)
    }

    func testFailedFlushKeepsEventsForRetry() async throws {
        let client = RecordingClient()
        await client.setFail(true)
        let queue = IngestQueue(
            config: .init(fileURL: tempFile(), maxBatchSize: 10),
            client: client
        )
        await queue.enqueue([makeEvent(), makeEvent()])
        let delivered = await queue.flush()
        XCTAssertEqual(delivered, 0)
        let depth = await queue.depth()
        XCTAssertEqual(depth, 2)
    }
}
