export const metadata = {
  title: "AZRI — Doctor console (preview)",
  description:
    "Read-only preview of the doctor console. Full RBAC, audit, and patient timeline land in v0.3.0.",
};

const SAMPLE_PATIENTS = [
  { id: "p-001", name: "—", lastEpisode: "2026-04-22", openAlerts: 0 },
  { id: "p-002", name: "—", lastEpisode: "2026-04-19", openAlerts: 1 },
  { id: "p-003", name: "—", lastEpisode: "2026-03-30", openAlerts: 0 },
] as const;

export default function ConsolePreviewPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <h1 className="text-2xl font-bold text-start">
        لوحة الطبيب — معاينة
        <span className="block text-base text-muted">
          Doctor console — preview
        </span>
      </h1>
      <p className="mt-2 max-w-prose text-muted text-start">
        A read-only preview of the doctor console. Full RBAC, audit log, and
        patient episode timeline land with v0.3.0 — see <code>ROADMAP.md</code>.
      </p>

      <table className="mt-6 w-full text-sm border border-border">
        <thead className="bg-surface">
          <tr>
            <th className="text-start px-3 py-2">Patient ID</th>
            <th className="text-start px-3 py-2">Last episode</th>
            <th className="text-start px-3 py-2">Open alerts</th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_PATIENTS.map((p) => (
            <tr key={p.id} className="border-t border-border">
              <td className="px-3 py-2 font-mono">{p.id}</td>
              <td className="px-3 py-2">{p.lastEpisode}</td>
              <td className="px-3 py-2">{p.openAlerts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
