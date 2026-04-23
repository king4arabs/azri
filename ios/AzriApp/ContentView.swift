//
//  ContentView.swift
//  Root view for the iPhone patient companion.
//

import SwiftUI

struct ContentView: View {
    @Binding var locale: AzriLocale

    @StateObject private var health = HealthKitService()
    @StateObject private var api = APIClient()
    @StateObject private var watch = WatchConnectivityService()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    header
                    healthKitCard
                    apiCard
                    watchCard
                    emergencyCard
                    Spacer(minLength: 32)
                }
                .padding(20)
            }
            .navigationTitle(AzriBrand.wordmark(for: locale))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(locale == .ar ? "English" : "العربية") {
                        locale = (locale == .ar) ? .en : .ar
                    }
                }
            }
        }
        .task {
            await health.requestAuthorization()
            await health.fetchLatestHeartRate()
            api.loadVersion()
            watch.activate()
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(AzriBrand.tagline(for: locale))
                .font(.title2).fontWeight(.semibold)
            Text(locale == .ar
                 ? "نرافق المريض، ونطمئن الأسرة، وندعم الطبيب بالبيانات والرؤية."
                 : "Supporting the patient, reassuring the family, and empowering the doctor.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
    }

    private var healthKitCard: some View {
        card(title: locale == .ar ? "العلامات الحيوية" : "Vital Signs") {
            switch health.state {
            case .idle:
                progress(locale == .ar ? "جارٍ التحميل…" : "Loading…")
            case .denied:
                Text(locale == .ar
                     ? "HealthKit لم يُصرَّح له بالقراءة."
                     : "HealthKit has not been authorized.")
                    .foregroundStyle(.secondary)
            case .unavailable:
                Text(locale == .ar
                     ? "HealthKit غير متاح على هذا الجهاز."
                     : "HealthKit is not available on this device.")
                    .foregroundStyle(.secondary)
            case .loaded(let beats):
                HStack(alignment: .firstTextBaseline) {
                    Text(String(format: "%.0f", beats))
                        .font(.system(size: 40, weight: .semibold, design: .rounded))
                    Text(locale == .ar ? "نبضة/د" : "bpm")
                        .foregroundStyle(.secondary)
                }
            case .error(let message):
                Text(message).foregroundStyle(.red)
            }
        }
    }

    private var apiCard: some View {
        card(title: locale == .ar ? "حالة الخادم" : "Server status") {
            switch api.state {
            case .idle: progress(locale == .ar ? "جارٍ الاتصال…" : "Connecting…")
            case .loaded(let version):
                Text("\(version.name) • v\(version.version)")
                    .font(.footnote.monospaced())
            case .error(let message):
                Text(message).foregroundStyle(.red)
            }
        }
    }

    private var watchCard: some View {
        card(title: locale == .ar ? "ساعة Apple Watch" : "Apple Watch") {
            Text(watch.status)
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
    }

    private var emergencyCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(locale == .ar ? "الطوارئ" : "Emergencies")
                .font(.headline)
            Text(AzriBrand.emergencyLine(for: locale))
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 14)
                .fill(Color.red.opacity(0.08))
        )
    }

    @ViewBuilder
    private func card(title: String, @ViewBuilder content: () -> some View) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(.headline)
            content()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 14)
                .fill(Color(.secondarySystemBackground))
        )
    }

    @ViewBuilder
    private func progress(_ label: String) -> some View {
        HStack(spacing: 10) {
            ProgressView()
            Text(label).foregroundStyle(.secondary)
        }
    }
}

#Preview {
    ContentView(locale: .constant(.ar))
}
