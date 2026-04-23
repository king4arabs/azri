// AzriWatch/AzriWatchApp.swift — watchOS app entry point.
//
// On-wrist alert UI + one-tap quick episode log. Watch screens stay
// terse — bilingual labels live in the same Localizable.strings files
// shared with the iPhone target via Xcode build phase.

import SwiftUI

@main
struct AzriWatchApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.layoutDirection, .rightToLeft)
        }
    }
}
