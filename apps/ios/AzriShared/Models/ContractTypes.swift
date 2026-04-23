// AzriShared/Models/ContractTypes.swift
//
// Swift mirror of the wire types declared in @azri/contracts. Kept in
// hand-sync because Swift codegen from Zod is not in our toolchain yet.
//
// ⚠ When @azri/contracts ships a MAJOR bump, this file MUST be updated
//   in the same PR. CI checks the SCHEMA_VERSION constant against the
//   value in packages/contracts/src/version.ts.

import Foundation

public enum SchemaVersion {
    public static let current = "0.2.0"
}

public enum DeviceKind: String, Codable {
    case iosPhone = "ios-phone"
    case iosWatch = "ios-watch"
    case androidPhone = "android-phone"
    case wearOs = "wear-os"
    case tizen
    case whoop
    case web
    case serverTest = "server-test"
    case unknown
}

public enum PhiClassification: String, Codable {
    case publicData = "public"
    case `internal` = "internal"
    case personal
    case health
    case healthSensitive = "health-sensitive"
}

public enum BiosignalKind: String, Codable {
    case heartRate = "heart_rate"
    case heartRateVariability = "heart_rate_variability"
    case restingHeartRate = "resting_heart_rate"
    case oxygenSaturation = "oxygen_saturation"
    case respiratoryRate = "respiratory_rate"
    case skinTemperatureDelta = "skin_temperature_delta"
    case electrodermalActivity = "electrodermal_activity"
    case sleepStage = "sleep_stage"
    case stepCount = "step_count"
    case activeEnergy = "active_energy"
    case fallDetection = "fall_detection"
    case seizureSensor = "seizure_sensor"
}

public enum BiosignalUnit: String, Codable {
    case bpm
    case ms
    case percent
    case breathsPerMin = "breaths_per_min"
    case celsiusDelta = "celsius_delta"
    case microsiemens
    case count
    case kcal
    case score
    case boolean
    case stage
}

public struct EventSource: Codable, Equatable {
    public var deviceKind: DeviceKind
    public var deviceModel: String?
    public var osVersion: String?
    public var appVersion: String?
    public var installId: String?

    public init(
        deviceKind: DeviceKind,
        deviceModel: String? = nil,
        osVersion: String? = nil,
        appVersion: String? = nil,
        installId: String? = nil
    ) {
        self.deviceKind = deviceKind
        self.deviceModel = deviceModel
        self.osVersion = osVersion
        self.appVersion = appVersion
        self.installId = installId
    }
}

public struct BiosignalSample: Codable, Equatable {
    public var at: Date
    public var value: Double
    public var confidence: Double?

    public init(at: Date, value: Double, confidence: Double? = nil) {
        self.at = at
        self.value = value
        self.confidence = confidence
    }
}

/// Wire envelope mirrors @azri/contracts BiosignalBatchEvent.
public struct BiosignalBatchEvent: Codable {
    public var type: String = "biosignal.batch"
    public var eventId: UUID
    public var schemaVersion: String
    public var occurredAt: Date
    public var organizationId: UUID
    public var patientId: UUID
    public var source: EventSource
    public var phiClassification: PhiClassification
    public var kind: BiosignalKind
    public var unit: BiosignalUnit
    public var samples: [BiosignalSample]
    public var samplingHz: Double?

    public init(
        eventId: UUID,
        occurredAt: Date,
        organizationId: UUID,
        patientId: UUID,
        source: EventSource,
        phiClassification: PhiClassification = .healthSensitive,
        kind: BiosignalKind,
        unit: BiosignalUnit,
        samples: [BiosignalSample],
        samplingHz: Double? = nil
    ) {
        self.eventId = eventId
        self.schemaVersion = SchemaVersion.current
        self.occurredAt = occurredAt
        self.organizationId = organizationId
        self.patientId = patientId
        self.source = source
        self.phiClassification = phiClassification
        self.kind = kind
        self.unit = unit
        self.samples = samples
        self.samplingHz = samplingHz
    }
}

/// Wire envelope for AlertRaisedEvent (subset; bodies omitted from
/// scaffold for brevity — fill before the watchOS alert UI ships).
public struct AlertRaisedEventLite: Codable {
    public let type = "alert.raised"
    public var eventId: UUID
    public var schemaVersion: String = SchemaVersion.current
    public var occurredAt: Date
    public var organizationId: UUID
    public var patientId: UUID
    public var source: EventSource
    public var phiClassification: PhiClassification
    public var alertId: UUID
    public var severity: String  // "info" | "warning" | "urgent" | "emergency"
    public var reason: String
    public var channels: [String]
}
