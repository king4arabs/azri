//
//  HealthKitService.swift
//  watchOS HealthKit read-only service. Mirrors AzriApp/Services/HealthKitService
//  but scoped for watchOS (no WatchConnectivity here).
//

import Foundation
import HealthKit

@MainActor
final class HealthKitService: ObservableObject {
    enum State: Equatable {
        case idle
        case unavailable
        case denied
        case loaded(Double)
        case error(String)
    }

    @Published private(set) var state: State = .idle

    private let store = HKHealthStore()

    private var readTypes: Set<HKObjectType> {
        var set = Set<HKObjectType>()
        if let t = HKObjectType.quantityType(forIdentifier: .heartRate) { set.insert(t) }
        if let t = HKObjectType.quantityType(forIdentifier: .heartRateVariabilitySDNN) { set.insert(t) }
        if let t = HKObjectType.quantityType(forIdentifier: .oxygenSaturation) { set.insert(t) }
        return set
    }

    func requestAuthorization() async {
        guard HKHealthStore.isHealthDataAvailable() else {
            state = .unavailable
            return
        }
        do {
            try await store.requestAuthorization(toShare: [], read: readTypes)
        } catch {
            state = .error(error.localizedDescription)
        }
    }

    func fetchLatestHeartRate() async {
        guard let type = HKObjectType.quantityType(forIdentifier: .heartRate) else {
            state = .unavailable
            return
        }

        let sort = NSSortDescriptor(key: HKSampleSortIdentifierEndDate, ascending: false)
        let query = HKSampleQuery(
            sampleType: type,
            predicate: nil,
            limit: 1,
            sortDescriptors: [sort]
        ) { [weak self] _, samples, error in
            Task { @MainActor in
                guard let self else { return }
                if let error {
                    self.state = .error(error.localizedDescription)
                    return
                }
                guard let sample = samples?.first as? HKQuantitySample else {
                    self.state = .denied
                    return
                }
                let bpm = sample.quantity.doubleValue(
                    for: HKUnit.count().unitDivided(by: .minute())
                )
                self.state = .loaded(bpm)
            }
        }
        store.execute(query)
    }
}
