package ai.azri.wear.ingest

import ai.azri.wear.BiosignalBatchEvent
import ai.azri.wear.WatchIngestRequest
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.IOException
import java.time.Instant
import java.util.UUID

class IngestClient(
    private val baseUrl: String,
    private val tokenProvider: () -> String,
    private val httpClient: OkHttpClient = OkHttpClient(),
) {
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

    /**
     * POST /v1/ingest/watch — returns true on 2xx.
     * @throws IOException on network errors so the queue can retry.
     */
    fun post(events: List<BiosignalBatchEvent>): Boolean {
        if (events.isEmpty()) return true
        val payload = WatchIngestRequest(
            batchId = UUID.randomUUID().toString(),
            sentAt = Instant.now().toString(),
            events = events,
        )
        val body = json.encodeToString(payload)
            .toRequestBody("application/json".toMediaType())
        val req = Request.Builder()
            .url("$baseUrl/v1/ingest/watch")
            .header("Authorization", "Bearer ${tokenProvider()}")
            .post(body)
            .build()
        httpClient.newCall(req).execute().use { res ->
            return res.isSuccessful
        }
    }
}
