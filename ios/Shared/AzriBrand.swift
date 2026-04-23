//
//  AzriBrand.swift
//  Shared between AzriApp (iOS) and AzriWatch (watchOS).
//
//  Minimal brand / locale helpers so both targets can render consistent
//  Arabic-first text without duplicating strings. The long-form bilingual
//  content lives in @azri/content on the JS side. When the iOS app needs
//  more than the brand basics, export a JSON snapshot of @azri/content
//  and bundle it — do not re-author strings here.
//

import Foundation
import SwiftUI

public enum AzriLocale: String, CaseIterable {
    case ar
    case en

    /// Best-effort locale pick from the system's preferred languages.
    /// KSA-first default: falls back to `ar` if nothing matches.
    public static func resolve() -> AzriLocale {
        for id in Locale.preferredLanguages {
            let lower = id.lowercased()
            if lower.hasPrefix("ar") { return .ar }
            if lower.hasPrefix("en") { return .en }
        }
        return .ar
    }

    public var layoutDirection: LayoutDirection {
        self == .ar ? .rightToLeft : .leftToRight
    }
}

public enum AzriBrand {
    public static let wordmarkLatin = "AZRI"
    public static let wordmarkArabic = "أزري"

    public static func tagline(for locale: AzriLocale) -> String {
        switch locale {
        case .ar: return "ذكاء اصطناعي بإنسانية"
        case .en: return "AI with Humanity"
        }
    }

    public static func wordmark(for locale: AzriLocale) -> String {
        locale == .ar ? wordmarkArabic : wordmarkLatin
    }

    /// Emergency guidance line. Must stay consistent with
    /// SKILLS/healthcare_product.md and PRIVACY_NOTICE.md.
    public static func emergencyLine(for locale: AzriLocale) -> String {
        switch locale {
        case .ar:
            return "في حالات الطوارئ الطبية داخل المملكة العربية السعودية، اتصل بالرقم 997 أو 911."
        case .en:
            return "For medical emergencies in Saudi Arabia, call 997 or 911."
        }
    }
}
