import Link from "next/link";

export const metadata = {
  title: "AZRI — Patient app",
  description:
    "Authenticated patient app: log episodes, view trends, manage alerts and caregivers.",
};

export default function PatientAppHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-start">
        أهلًا بك في أزري
        <span className="block text-base text-muted">Welcome to AZRI</span>
      </h1>
      <p className="mt-3 max-w-prose text-foreground text-start">
        من هنا تستطيع تسجيل الأحداث، عرض المؤشرات، وإدارة من تثق بهم من مقدمي الرعاية.
      </p>
      <p className="mt-1 max-w-prose text-muted text-start">
        From here you can log episodes, view trends, and manage your trusted
        caregivers. AZRI is clinical workflow support — it does not replace your
        doctor.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/app/episodes"
          className="block rounded-lg border border-border p-5 hover:border-accent transition-colors"
        >
          <h2 className="font-semibold">سجل حدث / Log an episode</h2>
          <p className="text-sm text-muted mt-1">
            Record a suspected seizure, aura, fall, or other event for your
            doctor to review.
          </p>
        </Link>
        <Link
          href="/app/trends"
          className="block rounded-lg border border-border p-5 hover:border-accent transition-colors"
        >
          <h2 className="font-semibold">المؤشرات / Trends</h2>
          <p className="text-sm text-muted mt-1">
            24-hour aggregates from your watch and wearable. No raw samples
            here — those live in the doctor console.
          </p>
        </Link>
        <Link
          href="/app/alerts"
          className="block rounded-lg border border-border p-5 hover:border-accent transition-colors"
        >
          <h2 className="font-semibold">التنبيهات / Alerts</h2>
          <p className="text-sm text-muted mt-1">
            Recent alerts and one-tap acknowledgement.
          </p>
        </Link>
        <Link
          href="/app/caregivers"
          className="block rounded-lg border border-border p-5 hover:border-accent transition-colors"
        >
          <h2 className="font-semibold">مقدمو الرعاية / Caregivers</h2>
          <p className="text-sm text-muted mt-1">
            Invite a family member with consent-scoped access.
          </p>
        </Link>
      </div>
    </div>
  );
}
