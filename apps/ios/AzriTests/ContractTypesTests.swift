// AzriTests/ContractTypesTests.swift
//
// Round-trips a BiosignalBatchEvent through JSON and asserts it lands
// on the wire shape that @azri/contracts will accept. If this fails
// after a Zod schema change, update ContractTypes.swift.

import XCTest
@testable import AzriShared

final class ContractTypesTests: XCTestCase {
    func testBiosignalBatchEventRoundTrip() throws {
        let event = BiosignalBatchEvent(
            eventId: UUID(),
            occurredAt: Date(timeIntervalSince1970: 1_745_000_000),
            organizationId: UUID(),
            patientId: UUID(),
            source: EventSource(deviceKind: .iosWatch, appVersion: "0.4.0"),
            kind: .heartRate,
            unit: .bpm,
            samples: [BiosignalSample(at: Date(timeIntervalSince1970: 1_745_000_001), value: 78)],
            samplingHz: 1
        )
        let enc = JSONEncoder()
        enc.dateEncodingStrategy = .iso8601
        let data = try enc.encode(event)
        let dec = JSONDecoder()
        dec.dateDecodingStrategy = .iso8601
        let decoded = try dec.decode(BiosignalBatchEvent.self, from: data)
        XCTAssertEqual(decoded.kind, .heartRate)
        XCTAssertEqual(decoded.unit, .bpm)
        XCTAssertEqual(decoded.samples.count, 1)
        XCTAssertEqual(decoded.schemaVersion, SchemaVersion.current)
    }

    func testSchemaVersionMatchesContractsPackage() {
        XCTAssertEqual(SchemaVersion.current, "0.2.0")
    }
}
