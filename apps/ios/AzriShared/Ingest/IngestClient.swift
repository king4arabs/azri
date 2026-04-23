// AzriShared/Ingest/IngestClient.swift
//
// Thin URLSession-based client for POST /v1/ingest/watch. Used by both
// the iPhone and watchOS targets. Encodes Date as ISO-8601 UTC strings to
// match the @azri/contracts wire format.

import Foundation

public protocol IngestPosting {
    func post(events: [BiosignalBatchEvent], batchId: UUID, sentAt: Date) async throws
}

public enum IngestError: Error {
    case http(status: Int, bodySnippet: String)
    case decoding(message: String)
}

public final class IngestClient: IngestPosting {
    public struct Configuration {
        public var baseUrl: URL
        public var bearerToken: () -> String
        public var session: URLSession

        public init(
            baseUrl: URL,
            bearerToken: @escaping () -> String,
            session: URLSession = .shared
        ) {
            self.baseUrl = baseUrl
            self.bearerToken = bearerToken
            self.session = session
        }
    }

    private let config: Configuration
    private let encoder: JSONEncoder

    public init(config: Configuration) {
        self.config = config
        let enc = JSONEncoder()
        enc.dateEncodingStrategy = .iso8601
        self.encoder = enc
    }

    public func post(events: [BiosignalBatchEvent], batchId: UUID, sentAt: Date) async throws {
        let url = config.baseUrl.appendingPathComponent("v1/ingest/watch")
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue("Bearer \(config.bearerToken())", forHTTPHeaderField: "Authorization")

        struct Body: Encodable {
            var batchId: UUID
            var sentAt: Date
            var events: [BiosignalBatchEvent]
        }
        req.httpBody = try encoder.encode(Body(batchId: batchId, sentAt: sentAt, events: events))

        let (data, response) = try await config.session.data(for: req)
        guard let http = response as? HTTPURLResponse else {
            throw IngestError.decoding(message: "non-HTTP response")
        }
        guard (200...299).contains(http.statusCode) else {
            let snippet = String(data: data.prefix(400), encoding: .utf8) ?? "<binary>"
            throw IngestError.http(status: http.statusCode, bodySnippet: snippet)
        }
    }
}
