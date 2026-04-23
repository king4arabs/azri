import * as Localization from "expo-localization";
import type { Bilingual } from "@azri/content";

/**
 * Picks the active locale variant for a Bilingual<T>. Falls back to
 * Arabic — AZRI is Arabic-first.
 */
export function pickLocale<T>(b: Bilingual<T>): T {
  const locale = Localization.getLocales()[0]?.languageCode ?? "ar";
  return locale === "en" ? b.en : b.ar;
}

export const strings = {
  tabs: {
    home: { ar: "الرئيسية", en: "Home" },
    episodes: { ar: "السجل", en: "Episodes" },
    trends: { ar: "المؤشرات", en: "Trends" },
    alerts: { ar: "التنبيهات", en: "Alerts" },
  },
  actions: {
    submit: { ar: "إرسال", en: "Submit" },
    sent: { ar: "تم الإرسال", en: "Sent" },
    cancel: { ar: "إلغاء", en: "Cancel" },
  },
  episode: {
    title: { ar: "سجل حدث", en: "Log an episode" },
    intro: {
      ar: "أزري لا يشخّص. نحن نساعدك على تسجيل ما حدث ليطّلع عليه طبيبك.",
      en: "AZRI does not diagnose. We help you record what happened so your doctor can see it.",
    },
    typeLabel: { ar: "نوع الحدث", en: "Episode type" },
    severityLabel: { ar: "الشدة", en: "Severity" },
    durationLabel: { ar: "المدة التقريبية", en: "Approximate duration" },
    noteLabel: { ar: "ملاحظة (اختيارية)", en: "Note (optional)" },
  },
  trends: {
    title: { ar: "المؤشرات", en: "Trends" },
    note: {
      ar: "هذه ملخصات يومية. التفاصيل الكاملة في لوحة الطبيب.",
      en: "These are daily aggregates. Full detail lives in the doctor console.",
    },
  },
  alerts: {
    title: { ar: "التنبيهات", en: "Alerts" },
    empty: { ar: "لا توجد تنبيهات حديثة", en: "No recent alerts" },
  },
} as const;
