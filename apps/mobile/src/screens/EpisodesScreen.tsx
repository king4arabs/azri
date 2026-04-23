import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { pickLocale, strings } from "../i18n/strings";

const TYPES = [
  { id: "suspected_seizure", ar: "نوبة محتملة", en: "Suspected seizure" },
  { id: "aura", ar: "إنذار مبكر", en: "Aura" },
  { id: "fall", ar: "سقوط", en: "Fall" },
  { id: "sleep_disturbance", ar: "اضطراب نوم", en: "Sleep disturbance" },
  { id: "missed_medication", ar: "نسيان جرعة", en: "Missed medication" },
  { id: "other", ar: "أخرى", en: "Other" },
] as const;

type Severity = "mild" | "moderate" | "severe";

export function EpisodesScreen() {
  const [type, setType] = useState<(typeof TYPES)[number]["id"]>("suspected_seizure");
  const [severity, setSeverity] = useState<Severity>("moderate");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pickLocale(strings.episode.title)}</Text>
      <Text style={styles.lead}>{pickLocale(strings.episode.intro)}</Text>

      <Text style={styles.label}>{pickLocale(strings.episode.typeLabel)}</Text>
      <View style={styles.row}>
        {TYPES.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setType(t.id)}
            style={[styles.chip, type === t.id && styles.chipActive]}
          >
            <Text style={[styles.chipLabel, type === t.id && styles.chipLabelActive]}>
              {pickLocale({ ar: t.ar, en: t.en })}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>{pickLocale(strings.episode.severityLabel)}</Text>
      <View style={styles.row}>
        {(["mild", "moderate", "severe"] as Severity[]).map((s) => (
          <Pressable
            key={s}
            onPress={() => setSeverity(s)}
            style={[styles.chip, severity === s && styles.chipActive]}
          >
            <Text style={[styles.chipLabel, severity === s && styles.chipLabelActive]}>
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>{pickLocale(strings.episode.noteLabel)}</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        multiline
        style={styles.input}
        textAlignVertical="top"
      />

      <Pressable
        disabled={sent}
        onPress={() => setSent(true)}
        style={[styles.submit, sent && styles.submitDisabled]}
      >
        <Text style={styles.submitLabel}>
          {pickLocale(sent ? strings.actions.sent : strings.actions.submit)}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 8 },
  title: { fontSize: 22, fontWeight: "700" },
  lead: { fontSize: 13, color: "#475569" },
  label: { fontSize: 13, fontWeight: "600", marginTop: 12 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 999,
  },
  chipActive: { backgroundColor: "#0d9488", borderColor: "#0d9488" },
  chipLabel: { fontSize: 13, color: "#0b1220" },
  chipLabelActive: { color: "#fff" },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  submit: {
    marginTop: 16,
    backgroundColor: "#0d9488",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitDisabled: { opacity: 0.6 },
  submitLabel: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
