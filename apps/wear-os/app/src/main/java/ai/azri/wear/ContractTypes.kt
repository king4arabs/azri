package ai.azri.wear

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * Kotlin mirror of @azri/contracts wire types — kept hand-in-hand with the
 * Zod schemas in packages/contracts. When SCHEMA_VERSION bumps MAJOR,
 * update this file in the same PR. CI checks the constant matches the
 * Zod-side version string.
 */
object SchemaVersion { const val current = "0.2.0" }

@Serializable
enum class DeviceKind {
    @SerialName("ios-phone") IOS_PHONE,
    @SerialName("ios-watch") IOS_WATCH,
    @SerialName("android-phone") ANDROID_PHONE,
    @SerialName("wear-os") WEAR_OS,
    @SerialName("tizen") TIZEN,
    @SerialName("whoop") WHOOP,
    @SerialName("web") WEB,
    @SerialName("server-test") SERVER_TEST,
    @SerialName("unknown") UNKNOWN,
}

@Serializable
enum class PhiClassification {
    @SerialName("public") PUBLIC,
    @SerialName("internal") INTERNAL,
    @SerialName("personal") PERSONAL,
    @SerialName("health") HEALTH,
    @SerialName("health-sensitive") HEALTH_SENSITIVE,
}

@Serializable
enum class BiosignalKind {
    @SerialName("heart_rate") HEART_RATE,
    @SerialName("heart_rate_variability") HEART_RATE_VARIABILITY,
    @SerialName("resting_heart_rate") RESTING_HEART_RATE,
    @SerialName("oxygen_saturation") OXYGEN_SATURATION,
    @SerialName("respiratory_rate") RESPIRATORY_RATE,
    @SerialName("step_count") STEP_COUNT,
    @SerialName("active_energy") ACTIVE_ENERGY,
    @SerialName("fall_detection") FALL_DETECTION,
}

@Serializable
enum class BiosignalUnit {
    @SerialName("bpm") BPM,
    @SerialName("ms") MS,
    @SerialName("percent") PERCENT,
    @SerialName("breaths_per_min") BREATHS_PER_MIN,
    @SerialName("count") COUNT,
    @SerialName("kcal") KCAL,
    @SerialName("score") SCORE,
    @SerialName("boolean") BOOLEAN,
}

@Serializable
data class EventSource(
    val deviceKind: DeviceKind,
    val deviceModel: String? = null,
    val osVersion: String? = null,
    val appVersion: String? = null,
    val installId: String? = null,
)

@Serializable
data class BiosignalSample(
    val at: String,                  // ISO-8601 UTC
    val value: Double,
    val confidence: Double? = null,
)

@Serializable
data class BiosignalBatchEvent(
    val type: String = "biosignal.batch",
    val eventId: String,
    val schemaVersion: String = SchemaVersion.current,
    val occurredAt: String,
    val organizationId: String,
    val patientId: String,
    val source: EventSource,
    val phiClassification: PhiClassification = PhiClassification.HEALTH_SENSITIVE,
    val kind: BiosignalKind,
    val unit: BiosignalUnit,
    val samples: List<BiosignalSample>,
    val samplingHz: Double? = null,
)

@Serializable
data class WatchIngestRequest(
    val batchId: String,
    val sentAt: String,
    val events: List<BiosignalBatchEvent>,
)
