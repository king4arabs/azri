import { ScrollView, StyleSheet, Text, View } from "react-native";
import { azriContent, pick } from "@azri/content";
import { pickLocale } from "../i18n/strings";

export function HomeScreen() {
  const brand = azriContent.brand;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {brand.arabicWordmark} / {brand.name}
      </Text>
      <Text style={styles.tagline}>{pickLocale(brand.tagline)}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {pickLocale({
            ar: "أهلًا بك",
            en: "Welcome",
          })}
        </Text>
        <Text style={styles.cardBody}>
          {pickLocale({
            ar: "من هنا تستطيع تسجيل الأحداث، عرض المؤشرات، وإدارة التنبيهات.",
            en: "From here you can log episodes, view trends, and manage alerts.",
          })}
        </Text>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          {pickLocale({
            ar: "أزري ليس بديلًا عن الطبيب أو الإسعاف. في الطوارئ اتصل بالرقم 997 أو 911.",
            en: "AZRI is not a replacement for your doctor or emergency services. In an emergency call 997 or 911.",
          })}
        </Text>
      </View>

      <Text style={styles.footer}>{pick(brand.tagline, "ar")}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  title: { fontSize: 28, fontWeight: "700" },
  tagline: { fontSize: 14, color: "#475569" },
  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    gap: 6,
  },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardBody: { fontSize: 14, color: "#475569", lineHeight: 22 },
  disclaimer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff7ed",
  },
  disclaimerText: { fontSize: 12, color: "#9a3412" },
  footer: { marginTop: 24, fontSize: 11, color: "#94a3b8", textAlign: "center" },
});
