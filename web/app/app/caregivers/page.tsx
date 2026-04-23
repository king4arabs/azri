import { CaregiverInviteForm } from "./caregiver-invite";

export const metadata = {
  title: "AZRI — Caregivers",
  description:
    "Invite a family member with consent-scoped access. You stay in control.",
};

const SCOPES = [
  { id: "view_episodes", ar: "رؤية الأحداث", en: "View episodes" },
  { id: "view_alerts", ar: "رؤية التنبيهات", en: "View alerts" },
  {
    id: "receive_emergency_alerts",
    ar: "استلام تنبيهات الطوارئ",
    en: "Receive emergency alerts",
  },
  {
    id: "view_aggregate_trends",
    ar: "رؤية المؤشرات (24 ساعة)",
    en: "View 24h aggregate trends",
  },
] as const;

export default function CaregiversPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-start">
        مقدمو الرعاية
        <span className="block text-base text-muted">Caregivers</span>
      </h1>
      <p className="mt-2 max-w-prose text-muted text-start">
        Invite someone you trust. You choose exactly what they can see.
        You can revoke access at any time.
      </p>

      <div className="mt-6 max-w-xl">
        <CaregiverInviteForm
          scopes={SCOPES.map((s) => ({ id: s.id, label: `${s.ar} / ${s.en}` }))}
        />
      </div>
    </div>
  );
}
