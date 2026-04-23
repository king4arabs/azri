// Azri/AzriApp.swift — iPhone app entry point.
//
// Forces the layout direction to RTL so Arabic users get the right
// experience by default; English users get LTR via the system language
// switch. Localised strings live in `Azri/{ar,en}.lproj/`.

import SwiftUI

@main
struct AzriApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.layoutDirection, .rightToLeft)
        }
    }
}
