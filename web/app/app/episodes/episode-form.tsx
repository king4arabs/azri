"use client";

import { useState } from "react";

const EPISODE_TYPES = [
  { id: "suspected_seizure", ar: "نوبة محتملة", en: "Suspected seizure" },
  { id: "aura", ar: "إنذار مبكر", en: "Aura" },
  { id: "fall", ar: "سقوط", en: "Fall" },
  { id: "sleep_disturbance", ar: "اضطراب نوم", en: "Sleep disturbance" },
  { id: "missed_medication", ar: "نسيان جرعة", en: "Missed medication" },
  { id: "mood_change", ar: "تغيّر مزاج", en: "Mood change" },
  { id: "other", ar: "أخرى", en: "Other" },
] as const;

export function EpisodeForm() {
  const [type, setType] = useState<(typeof EPISODE_TYPES)[number]["id"]>(
    "suspected_seizure",
  );
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">(
    "moderate",
  );
  const [duration, setDuration] = useState("30s_to_2m");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    // Real flow: build EpisodeLoggedEvent + POST to /v1/episodes via
    // createApiClient(...).logEpisode(...). Wired in v0.4.0.
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 text-start">
      <Field label={{ ar: "نوع الحدث", en: "Episode type" }}>
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as (typeof EPISODE_TYPES)[number]["id"])
          }
          className="w-full rounded border border-border bg-background p-2"
        >
          {EPISODE_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.ar} — {t.en}
            </option>
          ))}
        </select>
      </Field>

      <Field label={{ ar: "الشدة", en: "Severity" }}>
        <div className="flex gap-2">
          {(["mild", "moderate", "severe"] as const).map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSeverity(s)}
              className={`flex-1 rounded border px-3 py-2 text-sm ${
                severity === s
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <Field label={{ ar: "المدة التقريبية", en: "Approximate duration" }}>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full rounded border border-border bg-background p-2"
        >
          <option value="less_than_30s">&lt; 30s</option>
          <option value="30s_to_2m">30s – 2m</option>
          <option value="2m_to_5m">2m – 5m</option>
          <option value="more_than_5m">&gt; 5m</option>
          <option value="unknown">unknown</option>
        </select>
      </Field>

      <Field label={{ ar: "ملاحظة (اختيارية)", en: "Note (optional)" }}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full rounded border border-border bg-background p-2"
          maxLength={4000}
        />
      </Field>

      <button
        type="submit"
        disabled={submitted}
        className="rounded bg-accent px-4 py-2 text-accent-foreground disabled:opacity-60"
      >
        {submitted ? "تم الإرسال / Sent" : "إرسال / Submit"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: { ar: string; en: string };
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm mb-1">
        <span>{label.ar}</span>
        <span className="text-muted text-xs ms-2">/ {label.en}</span>
      </span>
      {children}
    </label>
  );
}
