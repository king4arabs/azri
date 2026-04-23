package ai.azri.wear.health

import android.content.Context
import androidx.health.services.client.HealthServices
import androidx.health.services.client.PassiveMonitoringClient
import androidx.health.services.client.data.DataType

/**
 * Wraps Health Services capability discovery so the rest of the app can
 * ask "is this watch capable of streaming heart rate?" without depending
 * directly on the alpha API.
 */
class HealthServicesAuthorizer(private val context: Context) {
    private val client: PassiveMonitoringClient by lazy {
        HealthServices.getClient(context).passiveMonitoringClient
    }

    suspend fun supportsHeartRate(): Boolean {
        return try {
            val capabilities = client.getCapabilitiesAsync().await()
            DataType.HEART_RATE_BPM in capabilities.supportedDataTypesPassiveMonitoring
        } catch (t: Throwable) {
            false
        }
    }

    suspend fun supportsSteps(): Boolean {
        return try {
            val capabilities = client.getCapabilitiesAsync().await()
            DataType.STEPS_DAILY in capabilities.supportedDataTypesPassiveMonitoring
        } catch (t: Throwable) {
            false
        }
    }
}

// Helper extension — Health Services returns ListenableFuture; this small
// adapter avoids pulling in Guava / coroutines-guava just for one call.
private suspend fun <T> com.google.common.util.concurrent.ListenableFuture<T>.await(): T {
    if (isDone) return get()
    return kotlinx.coroutines.suspendCancellableCoroutine { cont ->
        addListener({
            try { cont.resumeWith(Result.success(get())) }
            catch (t: Throwable) { cont.resumeWith(Result.failure(t)) }
        }, Runnable::run)
        cont.invokeOnCancellation { cancel(false) }
    }
}
