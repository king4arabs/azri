// AzriShared/Ingest/IngestQueue.swift
//
// Offline-tolerant ingest queue. Watch and phone both queue events
// locally; a background task flushes when the network is reachable.
// Backed by a simple file-on-disk for the scaffold; production swaps
// for SQLite or Core Data without changing the public surface.

import Foundation

public actor IngestQueue {
    public struct Configuration {
        public var fileURL: URL
        public var maxBatchSize: Int = 200

        public init(fileURL: URL, maxBatchSize: Int = 200) {
            self.fileURL = fileURL
            self.maxBatchSize = maxBatchSize
        }
    }

    private let config: Configuration
    private let client: IngestPosting
    private var pending: [BiosignalBatchEvent] = []

    public init(config: Configuration, client: IngestPosting) {
        self.config = config
        self.client = client
        self.pending = (try? Self.load(from: config.fileURL)) ?? []
    }

    public func enqueue(_ events: [BiosignalBatchEvent]) async {
        pending.append(contentsOf: events)
        try? Self.persist(pending, to: config.fileURL)
    }

    public func depth() -> Int { pending.count }

    /// Flushes up to `maxBatchSize` events. Returns the number of events
    /// successfully delivered. Failed deliveries remain in the queue for
    /// the next attempt.
    public func flush() async -> Int {
        guard !pending.isEmpty else { return 0 }
        let batch = Array(pending.prefix(config.maxBatchSize))
        do {
            try await client.post(events: batch, batchId: UUID(), sentAt: Date())
        } catch {
            return 0
        }
        pending.removeFirst(batch.count)
        try? Self.persist(pending, to: config.fileURL)
        return batch.count
    }

    private static func persist(_ events: [BiosignalBatchEvent], to url: URL) throws {
        let enc = JSONEncoder()
        enc.dateEncodingStrategy = .iso8601
        let data = try enc.encode(events)
        try data.write(to: url, options: [.atomic])
    }

    private static func load(from url: URL) throws -> [BiosignalBatchEvent] {
        guard FileManager.default.fileExists(atPath: url.path) else { return [] }
        let dec = JSONDecoder()
        dec.dateDecodingStrategy = .iso8601
        let data = try Data(contentsOf: url)
        return try dec.decode([BiosignalBatchEvent].self, from: data)
    }
}
