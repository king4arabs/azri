//
//  WatchConnectivityService.swift
//  Thin wrapper around WatchConnectivity so the iPhone ↔ Watch bridge
//  can be verified independently of PHI flows. No PHI crosses this bridge
//  in v0.4.0.
//

import Foundation
#if canImport(WatchConnectivity)
import WatchConnectivity
#endif

@MainActor
final class WatchConnectivityService: NSObject, ObservableObject {
    @Published private(set) var status: String = "inactive"

    private let session: WCSession? = {
        #if canImport(WatchConnectivity)
        return WCSession.isSupported() ? WCSession.default : nil
        #else
        return nil
        #endif
    }()

    override init() {
        super.init()
        #if canImport(WatchConnectivity)
        session?.delegate = self
        #endif
    }

    func activate() {
        #if canImport(WatchConnectivity)
        guard let session else {
            status = "WatchConnectivity unsupported"
            return
        }
        if session.activationState != .activated {
            session.activate()
        }
        Task { @MainActor in
            status = describe(session.activationState)
        }
        // Send a no-PHI hello so the Watch has something to render.
        if session.isReachable {
            session.sendMessage(["hello": "from-phone"], replyHandler: nil, errorHandler: { _ in })
        }
        #else
        status = "WatchConnectivity unavailable"
        #endif
    }

    private func describe(_ state: WCSessionActivationState) -> String {
        switch state {
        case .activated: return "activated"
        case .inactive: return "inactive"
        case .notActivated: return "not activated"
        @unknown default: return "unknown"
        }
    }
}

#if canImport(WatchConnectivity)
extension WatchConnectivityService: WCSessionDelegate {
    nonisolated func session(
        _ session: WCSession,
        activationDidCompleteWith activationState: WCSessionActivationState,
        error: Error?
    ) {
        Task { @MainActor [weak self] in
            self?.status = (error?.localizedDescription) ?? self!.describe(activationState)
        }
    }

    nonisolated func sessionDidBecomeInactive(_ session: WCSession) {}

    nonisolated func sessionDidDeactivate(_ session: WCSession) {
        // Re-activate for multi-watch pairing scenarios.
        session.activate()
    }
}
#endif
