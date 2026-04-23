package ai.azri.wear.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
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
fun AlertScreen(onAcknowledge: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterVertically),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(
            text = stringResource(id = R.string.alert_title),
            style = MaterialTheme.typography.title3,
        )
        Text(
            text = stringResource(id = R.string.alert_body),
            style = MaterialTheme.typography.body2,
        )
        Button(
            onClick = onAcknowledge,
            colors = ButtonDefaults.primaryButtonColors(),
        ) {
            Text(stringResource(id = R.string.alert_ack))
        }
    }
}
