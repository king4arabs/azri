export const metadata = {
  title: "AZRI — Alerts",
  description: "Recent alerts and acknowledgement.",
};

export default function AlertsPage() {
  // Real implementation streams alerts from the API. This page renders
  // the empty state until the alerts stream is wired (v0.4.0).
  return (
    <div>
      <h1 className="text-2xl font-bold text-start">
        التنبيهات
        <span className="block text-base text-muted">Alerts</span>
      </h1>
      <p className="mt-2 max-w-prose text-muted text-start">
        Recent alerts will appear here. AZRI never sends an emergency alert
        silently — you, your watch, and your consented caregivers are notified
        on at least one channel each.
      </p>
      <div className="mt-8 rounded-lg border border-border p-6 text-center">
        <p className="text-sm text-muted">
          لا توجد تنبيهات حديثة / No recent alerts
        </p>
      </div>
    </div>
  );
}
