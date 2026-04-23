// Azri/ContentView.swift
//
// Top-level patient-app shell. Three tabs map to the three watch-relevant
// features: episode log (manual entry), trends (passive signals view),
// alert relay (caregivers + acknowledgements).

import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            EpisodeLogView()
                .tabItem {
                    Label(
                        NSLocalizedString("tab.episodes", comment: "Episode log"),
                        systemImage: "list.bullet"
                    )
                }
            TrendsView()
                .tabItem {
                    Label(
                        NSLocalizedString("tab.trends", comment: "Trends"),
                        systemImage: "waveform.path.ecg"
                    )
                }
            AlertRelayView()
                .tabItem {
                    Label(
                        NSLocalizedString("tab.alerts", comment: "Alerts"),
                        systemImage: "bell.badge"
                    )
                }
        }
    }
}
