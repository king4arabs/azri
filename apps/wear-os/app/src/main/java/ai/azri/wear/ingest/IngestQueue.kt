package ai.azri.wear.ingest

import ai.azri.wear.BiosignalBatchEvent

/**
 * Thread-safe in-memory event queue. Production swaps the backing
 * ArrayDeque for a Room database without changing this surface.
 */
class IngestQueue(private val maxBatchSize: Int = 200) {
    private val pending = ArrayDeque<BiosignalBatchEvent>()
    private val lock = Any()

    fun enqueue(events: List<BiosignalBatchEvent>) {
        synchronized(lock) { pending.addAll(events) }
    }

    fun depth(): Int = synchronized(lock) { pending.size }

    /**
     * Dequeues up to maxBatchSize events, posts them via [poster], and
     * returns the number successfully delivered. Failed events are
     * re-queued at the head so order is preserved.
     */
    fun flush(poster: (List<BiosignalBatchEvent>) -> Boolean): Int {
        val batch: List<BiosignalBatchEvent> = synchronized(lock) {
            if (pending.isEmpty()) return 0
            val take = minOf(maxBatchSize, pending.size)
            (0 until take).map { pending.removeFirst() }
        }
        return try {
            if (poster(batch)) batch.size
            else { synchronized(lock) { batch.asReversed().forEach(pending::addFirst) }; 0 }
        } catch (t: Throwable) {
            synchronized(lock) { batch.asReversed().forEach(pending::addFirst) }
            0
        }
    }
}
