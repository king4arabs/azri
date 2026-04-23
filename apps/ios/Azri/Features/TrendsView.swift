// Azri/Features/TrendsView.swift
//
// Read-only summary of recent passive signals captured from HealthKit
// and the watch. Shows 24h aggregates only — no raw samples in product
// UI. The doctor console (web) is where raw signal review happens.

import SwiftUI

struct TrendsView: View {
    var body: some View {
        NavigationStack {
            List {
                Section(NSLocalizedString("trends.today", comment: "")) {
                    TrendRow(
                        icon: "heart.fill",
                        title: NSLocalizedString("trends.heartRate.avg", comment: ""),
                        value: "—"
                    )
                    TrendRow(
                        icon: "waveform.path.ecg",
                        title: NSLocalizedString("trends.hrv.avg", comment: ""),
                        value: "—"
                    )
                    TrendRow(
                        icon: "bed.double.fill",
                        title: NSLocalizedString("trends.sleep", comment: ""),
                        value: "—"
                    )
                }
            }
            .navigationTitle(NSLocalizedString("tab.trends", comment: ""))
        }
    }
}

private struct TrendRow: View {
    let icon: String
    let title: String
    let value: String

    var body: some View {
        HStack {
            Image(systemName: icon).frame(width: 28)
            Text(title)
            Spacer()
            Text(value).foregroundStyle(.secondary)
        }
    }
}
