package ai.azri.wear

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build

class AzriApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        registerNotificationChannel()
    }

    private fun registerNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val nm = getSystemService(NotificationManager::class.java) ?: return
            // Channel for the foreground biosignal collector — visible
            // because Android requires foreground services to be
            // user-visible. Patient-facing label is kept gentle.
            nm.createNotificationChannel(
                NotificationChannel(
                    "azri_collect",
                    getString(R.string.channel_collect),
                    NotificationManager.IMPORTANCE_LOW,
                )
            )
            // Separate channel for actual alerts; HIGH so they vibrate.
            nm.createNotificationChannel(
                NotificationChannel(
                    "azri_alerts",
                    getString(R.string.channel_alerts),
                    NotificationManager.IMPORTANCE_HIGH,
                )
            )
        }
    }
}
