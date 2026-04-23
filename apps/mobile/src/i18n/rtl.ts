import { I18nManager } from "react-native";
import * as Localization from "expo-localization";

/**
 * Forces RTL when the device locale is RTL (e.g. Arabic). React Native
 * requires a reload after changing direction; this is a no-op on
 * subsequent runs.
 */
export function ensureRtlForLocale(): void {
  const locale = Localization.getLocales()[0];
  const wantsRtl =
    locale?.textDirection === "rtl" || locale?.languageCode?.startsWith("ar");
  if (wantsRtl && !I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }
}
