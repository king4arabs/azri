// AzriWatch/Features/QuickEpisodeView.swift
//
// One-tap "I just had something" button. Sends the minimum-viable
// episode payload (suspected_seizure, severity unknown) to the phone
// via WatchConnectivity; full triage happens on the phone.

import SwiftUI
#if canImport(WatchKit)
import WatchKit
#endif

struct QuickEpisodeView: View {
    @State private var sent = false

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "heart.text.square")
                .font(.system(size: 36))
                .foregroundStyle(.tint)
            Text(NSLocalizedString("watch.episode.prompt", comment: ""))
                .font(.headline)
                .multilineTextAlignment(.center)
            Button(NSLocalizedString("watch.episode.log", comment: "")) {
                sent = true
                #if canImport(WatchKit)
                WKInterfaceDevice.current().play(.notification)
                #endif
                // Real flow: send BridgePayload.quickEpisode to phone.
            }
            .buttonStyle(.borderedProminent)
            .disabled(sent)
            if sent {
                Text(NSLocalizedString("watch.episode.sent", comment: ""))
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
        }
        .padding()
    }
}
