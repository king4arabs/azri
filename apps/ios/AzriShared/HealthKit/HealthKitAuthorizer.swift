// AzriShared/HealthKit/HealthKitAuthorizer.swift
//
// Wraps HealthKit authorization in a protocol so the rest of the app
// can be tested with a fake. Only requests the read scopes AZRI actually
// uses today — never request a permission "for later".

import Foundation
#if canImport(HealthKit)
import HealthKit
#endif

public enum HealthKitAuthorizationStatus: Equatable {
    case notDetermined
    case sharingDenied
    case sharingAuthorized
    case unavailable
}

public enum HealthKitReadScope: String, CaseIterable {
    case heartRate
    case restingHeartRate
    case heartRateVariabilitySDNN
    case oxygenSaturation
    case respiratoryRate
    case stepCount
    case activeEnergyBurned
    case sleepAnalysis
}

public protocol HealthKitAuthorizing {
    func isAvailable() -> Bool
    func currentStatus(for scope: HealthKitReadScope) -> HealthKitAuthorizationStatus
    func requestAuthorization(scopes: Set<HealthKitReadScope>) async throws -> Bool
}

public enum HealthKitError: Error, Equatable {
    case healthDataUnavailable
    case unsupportedScope(HealthKitReadScope)
}

#if canImport(HealthKit)
public final class HealthKitAuthorizer: HealthKitAuthorizing {
    private let store: HKHealthStore

    public init(store: HKHealthStore = HKHealthStore()) {
        self.store = store
    }

    public func isAvailable() -> Bool {
        HKHealthStore.isHealthDataAvailable()
    }

    public func currentStatus(for scope: HealthKitReadScope) -> HealthKitAuthorizationStatus {
        guard isAvailable() else { return .unavailable }
        guard let type = Self.objectType(for: scope) else { return .unavailable }
        switch store.authorizationStatus(for: type) {
        case .notDetermined: return .notDetermined
        case .sharingDenied: return .sharingDenied
        case .sharingAuthorized: return .sharingAuthorized
        @unknown default: return .notDetermined
        }
    }

    public func requestAuthorization(scopes: Set<HealthKitReadScope>) async throws -> Bool {
        guard isAvailable() else { throw HealthKitError.healthDataUnavailable }
        var readSet = Set<HKObjectType>()
        for scope in scopes {
            guard let t = Self.objectType(for: scope) else {
                throw HealthKitError.unsupportedScope(scope)
            }
            readSet.insert(t)
        }
        try await store.requestAuthorization(toShare: [], read: readSet)
        // Apple deliberately does not tell us if the user granted; we treat
        // a non-throw as "the user saw the prompt" and re-check status
        // per scope when reading samples.
        return true
    }

    private static func objectType(for scope: HealthKitReadScope) -> HKObjectType? {
        switch scope {
        case .heartRate: return HKObjectType.quantityType(forIdentifier: .heartRate)
        case .restingHeartRate: return HKObjectType.quantityType(forIdentifier: .restingHeartRate)
        case .heartRateVariabilitySDNN: return HKObjectType.quantityType(forIdentifier: .heartRateVariabilitySDNN)
        case .oxygenSaturation: return HKObjectType.quantityType(forIdentifier: .oxygenSaturation)
        case .respiratoryRate: return HKObjectType.quantityType(forIdentifier: .respiratoryRate)
        case .stepCount: return HKObjectType.quantityType(forIdentifier: .stepCount)
        case .activeEnergyBurned: return HKObjectType.quantityType(forIdentifier: .activeEnergyBurned)
        case .sleepAnalysis: return HKObjectType.categoryType(forIdentifier: .sleepAnalysis)
        }
    }
}
#endif

// MARK: - Test fake

/// In-memory fake usable on Linux CI and in unit tests where HealthKit
/// is not available.
public final class FakeHealthKitAuthorizer: HealthKitAuthorizing {
    public var available: Bool
    public var statuses: [HealthKitReadScope: HealthKitAuthorizationStatus]
    public private(set) var lastRequestedScopes: Set<HealthKitReadScope> = []

    public init(
        available: Bool = true,
        statuses: [HealthKitReadScope: HealthKitAuthorizationStatus] = [:]
    ) {
        self.available = available
        self.statuses = statuses
    }

    public func isAvailable() -> Bool { available }

    public func currentStatus(for scope: HealthKitReadScope) -> HealthKitAuthorizationStatus {
        statuses[scope] ?? .notDetermined
    }

    public func requestAuthorization(scopes: Set<HealthKitReadScope>) async throws -> Bool {
        guard available else { throw HealthKitError.healthDataUnavailable }
        lastRequestedScopes = scopes
        for scope in scopes where statuses[scope] == nil {
            statuses[scope] = .sharingAuthorized
        }
        return true
    }
}
