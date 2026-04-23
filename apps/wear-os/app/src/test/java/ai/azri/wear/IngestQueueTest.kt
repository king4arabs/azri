package ai.azri.wear

import ai.azri.wear.ingest.IngestQueue
import org.junit.Assert.assertEquals
import org.junit.Test
import java.time.Instant
import java.util.UUID

class IngestQueueTest {
    private fun event() = BiosignalBatchEvent(
        eventId = UUID.randomUUID().toString(),
        occurredAt = Instant.now().toString(),
        organizationId = UUID.randomUUID().toString(),
        patientId = UUID.randomUUID().toString(),
        source = EventSource(deviceKind = DeviceKind.WEAR_OS, appVersion = "0.4.0"),
        kind = BiosignalKind.HEART_RATE,
        unit = BiosignalUnit.BPM,
        samples = listOf(BiosignalSample(at = Instant.now().toString(), value = 78.0)),
        samplingHz = 1.0,
    )

    @Test fun flushSucceedsWhenPosterReturnsTrue() {
        val q = IngestQueue(maxBatchSize = 10)
        q.enqueue(listOf(event(), event(), event()))
        assertEquals(3, q.flush { true })
        assertEquals(0, q.depth())
    }

    @Test fun flushReQueuesOnFailure() {
        val q = IngestQueue(maxBatchSize = 10)
        q.enqueue(listOf(event(), event()))
        assertEquals(0, q.flush { false })
        assertEquals(2, q.depth())
    }

    @Test fun flushReQueuesOnException() {
        val q = IngestQueue(maxBatchSize = 10)
        q.enqueue(listOf(event()))
        assertEquals(0, q.flush { throw RuntimeException("network down") })
        assertEquals(1, q.depth())
    }
}
