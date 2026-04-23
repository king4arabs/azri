import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { I18nManager } from "react-native";
import { useEffect } from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { ensureRtlForLocale } from "./src/i18n/rtl";

export default function App() {
  useEffect(() => {
    ensureRtlForLocale();
  }, []);

  return (
    <View style={styles.root}>
      <AppNavigator />
      <StatusBar style="auto" />
    </View>
  );
}

// Forced eager RTL so initial render is correct on first launch in
// Arabic. `ensureRtlForLocale` handles the runtime case (locale change).
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
});
