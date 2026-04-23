// AzriShared/Connectivity/WatchConnectivityBridge.swift
//
// Single point of contact for WatchConnectivity messaging. Phone <-> Watch
// exchange (a) on-wrist alert acknowledgements upstream and (b) rendered
// alert bodies downstream. All payloads go through `BridgePayload` so the
// schema is one reviewable file.

import Foundation
#if canImport(WatchConnectivity)
import WatchConnectivity
#endif

public enum BridgePayload: Codable, Equatable {
    /// Phone -> Watch: tells the watch to render an alert.
    case renderAlert(title: String, body: String, severity: String, alertId: UUID)
    /// Watch -> Phone: patient acknowledged on-wrist.
    case alertAcknowledged(alertId: UUID, at: Date)
    /// Watch -> Phone: patient logged a quick episode from the wrist.
    case quickEpisode(episodeId: UUID, type: String, at: Date)
}

public protocol BridgeReceiving: AnyObject {
    func didReceive(_ payload: BridgePayload)
}

public protocol BridgeSending {
    func send(_ payload: BridgePayload) throws
}

#if canImport(WatchConnectivity)
public final class WatchConnectivityBridge: NSObject, BridgeSending, WCSessionDelegate {
    public weak var receiver: BridgeReceiving?

    private let session: WCSession
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()

    public init(session: WCSession = .default) {
        self.session = session
        super.init()
        if WCSession.isSupported() {
            session.delegate = self
            session.activate()
        }
    }

    public func send(_ payload: BridgePayload) throws {
        guard session.activationState == .activated else { return }
        let data = try encoder.encode(payload)
        if session.isReachable {
            session.sendMessageData(data, replyHandler: nil) { err in
                NSLog("WatchConnectivity send failed: \(err.localizedDescription)")
            }
        } else {
            try session.updateApplicationContext(["payload": data])
        }
    }

    public func session(_ session: WCSession, activationDidCompleteWith state: WCSessionActivationState, error: Error?) {}
    public func sessionDidBecomeInactive(_ session: WCSession) {}
    public func sessionDidDeactivate(_ session: WCSession) { session.activate() }

    public func session(_ session: WCSession, didReceiveMessageData data: Data) {
        if let payload = try? decoder.decode(BridgePayload.self, from: data) {
            receiver?.didReceive(payload)
        }
    }
}
#endif

/// In-memory test double usable on Linux.
public final class FakeBridge: BridgeSending {
    public private(set) var sent: [BridgePayload] = []
    public init() {}
    public func send(_ payload: BridgePayload) throws { sent.append(payload) }
}
