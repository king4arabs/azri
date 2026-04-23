import { ScrollView, StyleSheet, Text, View } from "react-native";
import { pickLocale, strings } from "../i18n/strings";

const ROWS = [
  { ar: "متوسط نبض القلب", en: "Heart rate (avg)", value: "—", unit: "bpm" },
  { ar: "تنوع نبض القلب", en: "HRV (RMSSD)", value: "—", unit: "ms" },
  { ar: "النوم", en: "Sleep performance", value: "—", unit: "%" },
  { ar: "Whoop strain", en: "Whoop strain", value: "—", unit: "" },
];

export function TrendsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pickLocale(strings.trends.title)}</Text>
      <Text style={styles.lead}>{pickLocale(strings.trends.note)}</Text>
      <View style={styles.list}>
        {ROWS.map((r) => (
          <View key={r.en} style={styles.row}>
            <Text style={styles.rowTitle}>{pickLocale({ ar: r.ar, en: r.en })}</Text>
            <Text style={styles.rowValue}>
              {r.value} <Text style={styles.unit}>{r.unit}</Text>
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  lead: { fontSize: 13, color: "#475569" },
  list: { marginTop: 16, gap: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  rowTitle: { fontSize: 14 },
  rowValue: { fontSize: 14, color: "#475569" },
  unit: { fontSize: 11, color: "#94a3b8" },
});
