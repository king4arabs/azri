//
//  ContentView.swift
//  AZRI Apple Watch companion root view.
//
//  Minimal: shows the brand, the most recent heart-rate sample, and the
//  emergency hint. The Watch surface intentionally never interprets
//  clinical signals — see AI_TRANSPARENCY.md.
//

import SwiftUI

struct ContentView: View {
    @Binding var locale: AzriLocale

    @StateObject private var health = HealthKitService()

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 10) {
                Text(AzriBrand.wordmark(for: locale))
                    .font(.headline)
                Text(AzriBrand.tagline(for: locale))
                    .font(.caption2)
                    .foregroundStyle(.secondary)

                Divider()

                heartRate

                Divider()

                Text(AzriBrand.emergencyLine(for: locale))
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 4)
        }
        .task {
            await health.requestAuthorization()
            await health.fetchLatestHeartRate()
        }
    }

    @ViewBuilder
    private var heartRate: some View {
        switch health.state {
        case .idle:
            ProgressView()
        case .denied:
            Text(locale == .ar ? "لم يُصرَّح بالقراءة" : "Not authorized")
                .font(.caption)
                .foregroundStyle(.secondary)
        case .unavailable:
            Text(locale == .ar ? "غير متاح" : "Unavailable")
                .font(.caption)
                .foregroundStyle(.secondary)
        case .loaded(let beats):
            HStack(alignment: .firstTextBaseline, spacing: 4) {
                Text(String(format: "%.0f", beats))
                    .font(.system(size: 32, weight: .semibold, design: .rounded))
                Text(locale == .ar ? "نبضة/د" : "bpm")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        case .error(let message):
            Text(message)
                .font(.caption2)
                .foregroundStyle(.red)
        }
    }
}

#Preview {
    ContentView(locale: .constant(.ar))
}
