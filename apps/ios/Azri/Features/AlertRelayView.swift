// Azri/Features/AlertRelayView.swift
//
// Lists the most recent alerts and lets the patient acknowledge them.
// Caregiver invite flow lives behind the "Manage caregivers" button —
// stubbed here, full flow lands with v0.4.0 caregiver invite.

import SwiftUI

struct AlertRelayView: View {
    var body: some View {
        NavigationStack {
            List {
                Section(NSLocalizedString("alerts.recent", comment: "")) {
                    Text(NSLocalizedString("alerts.empty", comment: ""))
                        .foregroundStyle(.secondary)
                }
                Section {
                    NavigationLink(NSLocalizedString("alerts.manageCaregivers", comment: "")) {
                        Text("TODO: caregiver invite + consent scopes")
                            .padding()
                    }
                }
            }
            .navigationTitle(NSLocalizedString("tab.alerts", comment: ""))
        }
    }
}
