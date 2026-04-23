// AzriWatch/ContentView.swift — Watch root.
//
// The watch surface is intentionally narrow:
//   1. Show the latest unacknowledged alert (if any) full-screen.
//   2. Otherwise show a single "Log episode" button.
// Anything else lives on the phone.

import SwiftUI

struct ContentView: View {
    @State private var hasPendingAlert = false

    var body: some View {
        if hasPendingAlert {
            OnWristAlertView(onAcknowledge: { hasPendingAlert = false })
        } else {
            QuickEpisodeView()
        }
    }
}
