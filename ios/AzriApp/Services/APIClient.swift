//
//  APIClient.swift
//  Typed client for @azri/api. Today it reaches one endpoint: GET /version.
//  When auth lands (ADR-0004), wrap every authenticated call so a single
//  point enforces the audit-log discipline.
//

import Foundation

struct APIVersion: Decodable {
    let name: String
    let version: String
    let commit: String?
}

@MainActor
final class APIClient: ObservableObject {
    enum State: Equatable {
        case idle
        case loaded(APIVersion)
        case error(String)

        static func == (lhs: State, rhs: State) -> Bool {
            switch (lhs, rhs) {
            case (.idle, .idle): return true
            case (.loaded(let a), .loaded(let b)):
                return a.name == b.name && a.version == b.version && a.commit == b.commit
            case (.error(let a), .error(let b)): return a == b
            default: return false
            }
        }
    }

    @Published private(set) var state: State = .idle

    /// Base URL of @azri/api. Overridden in Release builds by the bundled
    /// Info.plist (`AZRI_API_BASE_URL`). Defaults to localhost for dev.
    private var baseURL: URL {
        if let raw = Bundle.main.object(forInfoDictionaryKey: "AZRI_API_BASE_URL") as? String,
           let url = URL(string: raw) {
            return url
        }
        return URL(string: "http://localhost:3001")!
    }

    func loadVersion() {
        Task {
            await self.fetchVersion()
        }
    }

    private func fetchVersion() async {
        let url = baseURL.appendingPathComponent("/version")
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        // Correlate client requests with server-side logs.
        request.setValue(UUID().uuidString, forHTTPHeaderField: "x-request-id")
        request.timeoutInterval = 10

        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let http = response as? HTTPURLResponse, (200...299).contains(http.statusCode) else {
                state = .error("Unexpected server status")
                return
            }
            let version = try JSONDecoder().decode(APIVersion.self, from: data)
            state = .loaded(version)
        } catch {
            state = .error(error.localizedDescription)
        }
    }
}
