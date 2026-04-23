/**
 * In-memory idempotency cache. Production swaps this for Redis behind the
 * same interface — keep the surface tight so the swap is mechanical.
 *
 * Watch and Whoop webhook handlers MUST consult this before performing
 * side effects so retried clients (offline-then-flush, network glitch,
 * Whoop's at-least-once delivery) don't double-record events.
 */
export interface IdempotencyStore {
  /** Returns true if `key` was newly recorded; false if it already existed. */
  recordIfNew(key: string, ttlMs?: number): Promise<boolean>;
}

export function createInMemoryIdempotencyStore(): IdempotencyStore {
  const seen = new Map<string, number>();
  return {
    async recordIfNew(key, ttlMs = 24 * 60 * 60 * 1000) {
      const now = Date.now();
      const expiry = seen.get(key);
      if (expiry && expiry > now) return false;
      seen.set(key, now + ttlMs);
      // Opportunistic cleanup — bounded scan, doesn't block.
      if (seen.size > 10_000) {
        for (const [k, exp] of seen) {
          if (exp <= now) seen.delete(k);
        }
      }
      return true;
    },
  };
}
