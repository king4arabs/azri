//
//  AzriApp.swift
//  iPhone patient companion app entry point.
//

import SwiftUI

@main
struct AzriApp: App {
    @State private var locale: AzriLocale = AzriLocale.resolve()

    var body: some Scene {
        WindowGroup {
            ContentView(locale: $locale)
                .environment(\.layoutDirection, locale.layoutDirection)
                .environment(\.locale, Locale(identifier: locale.rawValue))
        }
    }
}
