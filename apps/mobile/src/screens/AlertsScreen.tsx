import { ScrollView, StyleSheet, Text, View } from "react-native";
import { pickLocale, strings } from "../i18n/strings";

export function AlertsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pickLocale(strings.alerts.title)}</Text>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{pickLocale(strings.alerts.empty)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  empty: {
    marginTop: 24,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  emptyText: { fontSize: 13, color: "#475569" },
});
