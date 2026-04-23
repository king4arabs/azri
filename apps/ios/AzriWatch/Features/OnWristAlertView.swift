// AzriWatch/Features/OnWristAlertView.swift
//
// Full-screen alert with a haptic. Acknowledging sends a
// `BridgePayload.alertAcknowledged` over WatchConnectivity to the phone,
// which forwards an `AlertAcknowledgedEvent` to the API.

import SwiftUI
#if canImport(WatchKit)
import WatchKit
#endif

struct OnWristAlertView: View {
    var onAcknowledge: () -> Void

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 36))
                .foregroundStyle(.yellow)
            Text(NSLocalizedString("watch.alert.title", comment: ""))
                .font(.headline)
                .multilineTextAlignment(.center)
            Text(NSLocalizedString("watch.alert.body", comment: ""))
                .font(.footnote)
                .multilineTextAlignment(.center)
            Button(NSLocalizedString("watch.alert.ack", comment: "")) {
                #if canImport(WatchKit)
                WKInterfaceDevice.current().play(.success)
                #endif
                onAcknowledge()
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
