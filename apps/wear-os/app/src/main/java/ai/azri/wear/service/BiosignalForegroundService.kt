package ai.azri.wear.service

import android.app.Notification
import android.app.Service
import android.content.Intent
import android.os.IBinder
import androidx.core.app.NotificationCompat
import ai.azri.wear.R

/**
 * Long-running foreground service that keeps biosignal capture alive.
 * Wear OS requires this — the OS would otherwise suspend the app when
 * the wrist is lowered or the screen sleeps.
 *
 * The service is intentionally thin; the actual collector + ingest
 * client live in their own packages so they can be unit-tested.
 */
class BiosignalForegroundService : Service() {

    override fun onCreate() {
        super.onCreate()
        startForeground(NOTIFICATION_ID, buildNotification())
        // Real wiring: subscribe to PassiveMonitoringClient updates and
        // route samples through BiosignalCollector + IngestQueue.
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun buildNotification(): Notification {
        return NotificationCompat.Builder(this, "azri_collect")
            .setContentTitle(getString(R.string.collect_title))
            .setContentText(getString(R.string.collect_body))
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setOngoing(true)
            .build()
    }

    companion object { private const val NOTIFICATION_ID = 1001 }
}
