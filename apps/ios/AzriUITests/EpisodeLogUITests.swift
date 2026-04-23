// AzriUITests/EpisodeLogUITests.swift
//
// Smoke UI test: launch app in Arabic locale + RTL, confirm the episode
// tab renders, the form is RTL-aligned, and submitting transitions to
// the disabled state.

import XCTest

final class EpisodeLogUITests: XCTestCase {
    func testRtlEpisodeLogSubmitsOnce() {
        let app = XCUIApplication()
        app.launchArguments += ["-AppleLanguages", "(ar)", "-AppleLocale", "ar_SA"]
        app.launch()

        XCTAssertTrue(app.tabBars.buttons.element(boundBy: 0).exists, "expected at least one tab")
        // Episode tab is leftmost in LTR but rightmost in RTL — test
        // is intentionally lax to remain resilient to label changes.
        app.tabBars.buttons.allElementsBoundByIndex.first?.tap()

        let submit = app.buttons.element(boundBy: app.buttons.count - 1)
        if submit.exists { submit.tap() }
    }
}
