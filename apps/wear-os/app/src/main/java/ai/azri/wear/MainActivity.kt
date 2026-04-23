package ai.azri.wear

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import ai.azri.wear.ui.AlertScreen
import ai.azri.wear.ui.QuickEpisodeScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            var pendingAlert by remember { mutableStateOf(false) }
            if (pendingAlert) {
                AlertScreen(onAcknowledge = { pendingAlert = false })
            } else {
                QuickEpisodeScreen()
            }
        }
    }
}
