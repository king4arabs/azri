package ai.azri.wear.health

import ai.azri.wear.BiosignalBatchEvent
import ai.azri.wear.BiosignalKind
import ai.azri.wear.BiosignalSample
import ai.azri.wear.BiosignalUnit
import ai.azri.wear.DeviceKind
import ai.azri.wear.EventSource
import ai.azri.wear.SchemaVersion
import java.time.Instant
import java.util.UUID

/**
 * Pure transform that turns one heart-rate sample reported by Health
 * Services into a `BiosignalBatchEvent`. The foreground service drives
 * this with the live sensor stream; tests drive it directly.
 */
class BiosignalCollector(
    private val organizationId: UUID,
    private val patientId: UUID,
    private val installId: String?,
    private val appVersion: String,
) {
    fun heartRateBatch(bpm: Double, at: Instant): BiosignalBatchEvent {
        val iso = at.toString()
        return BiosignalBatchEvent(
            eventId = UUID.randomUUID().toString(),
            schemaVersion = SchemaVersion.current,
            occurredAt = iso,
            organizationId = organizationId.toString(),
            patientId = patientId.toString(),
            source = EventSource(
                deviceKind = DeviceKind.WEAR_OS,
                deviceModel = android.os.Build.MODEL,
                osVersion = android.os.Build.VERSION.RELEASE,
                appVersion = appVersion,
                installId = installId,
            ),
            kind = BiosignalKind.HEART_RATE,
            unit = BiosignalUnit.BPM,
            samples = listOf(BiosignalSample(at = iso, value = bpm)),
            samplingHz = 1.0,
        )
    }
}
