// AzriShared/HealthKit/BiosignalCollector.swift
//
// Periodically collects biosignal samples from HealthKit and hands them
// to the IngestQueue. Only collects scopes the user has authorized —
// never silently re-requests.
//
// On a real device, anchored queries + observer queries replace the
// poll loop; this scaffold uses the simpler shape so the algorithm
// shape is reviewable in one file.

import Foundation
#if canImport(HealthKit)
import HealthKit
#endif

public protocol BiosignalCollecting {
    func collectOnce(now: Date) async throws -> [BiosignalBatchEvent]
}

public final class BiosignalCollector: BiosignalCollecting {
    public struct Configuration {
        public var organizationId: UUID
        public var patientId: UUID
        public var source: EventSource

        public init(organizationId: UUID, patientId: UUID, source: EventSource) {
            self.organizationId = organizationId
            self.patientId = patientId
            self.source = source
        }
    }

    private let config: Configuration
    private let authorizer: HealthKitAuthorizing

    public init(config: Configuration, authorizer: HealthKitAuthorizing) {
        self.config = config
        self.authorizer = authorizer
    }

    public func collectOnce(now: Date = Date()) async throws -> [BiosignalBatchEvent] {
        // The real implementation queries HealthKit per scope. The
        // scaffold returns an empty array on Linux/CI and ALSO when the
        // user has denied authorization for every scope — this lets the
        // upper layers exercise the empty-batch path.
        guard authorizer.isAvailable() else { return [] }
        var events: [BiosignalBatchEvent] = []
        if authorizer.currentStatus(for: .heartRate) == .sharingAuthorized {
            events.append(
                BiosignalBatchEvent(
                    eventId: UUID(),
                    occurredAt: now,
                    organizationId: config.organizationId,
                    patientId: config.patientId,
                    source: config.source,
                    kind: .heartRate,
                    unit: .bpm,
                    samples: [BiosignalSample(at: now, value: 0, confidence: 0)],
                    samplingHz: 1
                )
            )
        }
        return events
    }
}
