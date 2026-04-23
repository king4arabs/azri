"use client";

import { useState } from "react";

export interface ScopeOption {
  id: string;
  label: string;
}

export function CaregiverInviteForm({ scopes }: { scopes: ScopeOption[] }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [enabled, setEnabled] = useState<Set<string>>(
    new Set(["view_alerts", "receive_emergency_alerts"]),
  );
  const [submitted, setSubmitted] = useState(false);

  function toggle(id: string) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    // Real flow: POST a CaregiverConsent record (status: "pending") and
    // dispatch an invite via the notification service. v0.4.0.
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 text-start">
      <label className="block">
        <span className="block text-sm mb-1">
          اسم مقدم الرعاية / Caregiver name
        </span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-border bg-background p-2"
        />
      </label>
      <label className="block">
        <span className="block text-sm mb-1">
          رقم الجوال أو البريد / Phone or email
        </span>
        <input
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full rounded border border-border bg-background p-2"
        />
      </label>
      <fieldset className="rounded border border-border p-3">
        <legend className="px-1 text-sm">صلاحيات / Scopes</legend>
        <div className="grid gap-2 mt-2">
          {scopes.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={enabled.has(s.id)}
                onChange={() => toggle(s.id)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={submitted}
        className="rounded bg-accent px-4 py-2 text-accent-foreground disabled:opacity-60"
      >
        {submitted ? "تم إرسال الدعوة / Invite sent" : "إرسال الدعوة / Send invite"}
      </button>
    </form>
  );
}
