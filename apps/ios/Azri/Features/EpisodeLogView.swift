// Azri/Features/EpisodeLogView.swift
//
// Patient logs an episode (suspected seizure, aura, fall, etc.). Wording
// is conservative — AZRI does not diagnose. Submit calls the
// `IngestClient.post` flow with an `EpisodeLoggedEvent`-shaped payload.

import SwiftUI

struct EpisodeLogView: View {
    @State private var episodeType: String = "suspected_seizure"
    @State private var severity: String = "moderate"
    @State private var coarseDuration: String = "30s_to_2m"
    @State private var note: String = ""
    @State private var submitted = false

    private let episodeTypes = [
        "suspected_seizure",
        "aura",
        "fall",
        "sleep_disturbance",
        "missed_medication",
        "mood_change",
        "other",
    ]

    var body: some View {
        NavigationStack {
            Form {
                Section(NSLocalizedString("episode.type", comment: "Episode type")) {
                    Picker("", selection: $episodeType) {
                        ForEach(episodeTypes, id: \.self) { type in
                            Text(NSLocalizedString("episode.type.\(type)", comment: "")).tag(type)
                        }
                    }
                    .pickerStyle(.menu)
                }
                Section(NSLocalizedString("episode.severity", comment: "Severity")) {
                    Picker("", selection: $severity) {
                        Text(NSLocalizedString("episode.severity.mild", comment: "")).tag("mild")
                        Text(NSLocalizedString("episode.severity.moderate", comment: "")).tag("moderate")
                        Text(NSLocalizedString("episode.severity.severe", comment: "")).tag("severe")
                    }
                    .pickerStyle(.segmented)
                }
                Section(NSLocalizedString("episode.duration", comment: "Coarse duration")) {
                    Picker("", selection: $coarseDuration) {
                        Text("< 30s").tag("less_than_30s")
                        Text("30s–2m").tag("30s_to_2m")
                        Text("2m–5m").tag("2m_to_5m")
                        Text("> 5m").tag("more_than_5m")
                        Text(NSLocalizedString("episode.duration.unknown", comment: "")).tag("unknown")
                    }
                }
                Section(NSLocalizedString("episode.note", comment: "Note (optional)")) {
                    TextEditor(text: $note).frame(minHeight: 80)
                }
                Section {
                    Button(NSLocalizedString("episode.submit", comment: "Submit")) {
                        submitted = true
                        // Real submit dispatches an EpisodeLoggedEvent
                        // through the IngestClient. Wired in v0.4.0.
                    }
                    .disabled(submitted)
                }
            }
            .navigationTitle(NSLocalizedString("tab.episodes", comment: ""))
        }
    }
}
