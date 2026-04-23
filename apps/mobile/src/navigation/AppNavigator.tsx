import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { EpisodesScreen } from "../screens/EpisodesScreen";
import { TrendsScreen } from "../screens/TrendsScreen";
import { AlertsScreen } from "../screens/AlertsScreen";
import { pickLocale, strings } from "../i18n/strings";

const TABS = [
  { id: "home", screen: HomeScreen, label: strings.tabs.home },
  { id: "episodes", screen: EpisodesScreen, label: strings.tabs.episodes },
  { id: "trends", screen: TrendsScreen, label: strings.tabs.trends },
  { id: "alerts", screen: AlertsScreen, label: strings.tabs.alerts },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AppNavigator() {
  const [active, setActive] = useState<TabId>("home");
  const Screen = TABS.find((t) => t.id === active)?.screen ?? HomeScreen;

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <Screen />
      </View>
      <View style={styles.tabbar}>
        {TABS.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setActive(t.id)}
            style={[styles.tab, active === t.id && styles.tabActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: active === t.id }}
          >
            <Text style={[styles.tabLabel, active === t.id && styles.tabLabelActive]}>
              {pickLocale(t.label)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 48 },
  body: { flex: 1 },
  tabbar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#e2e8f0",
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabActive: { borderTopWidth: 2, borderTopColor: "#0d9488" },
  tabLabel: { fontSize: 13, color: "#475569" },
  tabLabelActive: { color: "#0d9488", fontWeight: "600" },
});
