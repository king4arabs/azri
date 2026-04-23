import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "AZRI",
  slug: "azri-patient",
  scheme: "azri",
  version: "0.4.0",
  orientation: "portrait",
  // Per-platform locale catalogs are wired in via expo-localization at
  // runtime; declarative locales are a v0.5.0 follow-up once we lock the
  // Arabic + English catalog file format.
  locales: {
    ar: "./locales/ar.json",
    en: "./locales/en.json",
  },
  ios: {
    bundleIdentifier: "ai.azri.patient",
    supportsTablet: false,
    infoPlist: {
      NSHealthShareUsageDescription:
        "AZRI uses your heart rate, HRV, sleep, and motion data to support epilepsy monitoring and to alert your trusted caregivers.",
      NSMotionUsageDescription:
        "AZRI uses motion data to help detect possible falls.",
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    package: "ai.azri.patient",
    permissions: [
      "android.permission.BODY_SENSORS",
      "android.permission.BODY_SENSORS_BACKGROUND",
      "android.permission.ACTIVITY_RECOGNITION",
      "android.permission.POST_NOTIFICATIONS",
    ],
    // RTL on Android is enabled via I18nManager.forceRTL at runtime in
    // App.tsx — Expo's typed config doesn't expose android:supportsRtl,
    // so we set it via a build-time manifest plugin in v0.5.0.
  },
  extra: {
    apiBaseUrl: process.env["EXPO_PUBLIC_API_BASE_URL"] ?? "http://localhost:8080",
  },
};

export default config;
