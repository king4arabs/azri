// AzriTests/HealthKitAuthorizerTests.swift

import XCTest
@testable import AzriShared

final class HealthKitAuthorizerTests: XCTestCase {
    func testFakeAuthorizerGrantsAllRequestedScopes() async throws {
        let fake = FakeHealthKitAuthorizer()
        let scopes: Set<HealthKitReadScope> = [.heartRate, .heartRateVariabilitySDNN, .stepCount]
        let ok = try await fake.requestAuthorization(scopes: scopes)
        XCTAssertTrue(ok)
        XCTAssertEqual(fake.lastRequestedScopes, scopes)
        for scope in scopes {
            XCTAssertEqual(fake.currentStatus(for: scope), .sharingAuthorized)
        }
    }

    func testFakeAuthorizerRespectsPreSetStatuses() {
        let fake = FakeHealthKitAuthorizer(
            statuses: [.heartRate: .sharingDenied]
        )
        XCTAssertEqual(fake.currentStatus(for: .heartRate), .sharingDenied)
        XCTAssertEqual(fake.currentStatus(for: .stepCount), .notDetermined)
    }

    func testUnavailableHealthKitThrows() async {
        let fake = FakeHealthKitAuthorizer(available: false)
        do {
            _ = try await fake.requestAuthorization(scopes: [.heartRate])
            XCTFail("expected throw")
        } catch HealthKitError.healthDataUnavailable {
            // expected
        } catch {
            XCTFail("unexpected error: \(error)")
        }
    }
}
