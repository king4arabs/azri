package ai.azri.wear.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.wear.compose.material.Button
import androidx.wear.compose.material.ButtonDefaults
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import ai.azri.wear.R

@Composable
fun QuickEpisodeScreen() {
    var sent by remember { mutableStateOf(false) }
    Column(
        modifier = Modifier.fillMaxSize().padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterVertically),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(
            text = stringResource(id = R.string.episode_prompt),
            style = MaterialTheme.typography.title3,
        )
        Button(
            enabled = !sent,
            onClick = { sent = true /* TODO: post to phone via DataLayer */ },
            colors = ButtonDefaults.primaryButtonColors(),
        ) { Text(stringResource(id = R.string.episode_log)) }
        if (sent) {
            Text(
                text = stringResource(id = R.string.episode_sent),
                style = MaterialTheme.typography.caption2,
            )
        }
    }
}
