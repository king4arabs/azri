import { TrendChart } from "./trend-chart";

export const metadata = {
  title: "AZRI — Trends",
  description: "24-hour biosignal aggregates from your watch and wearable.",
};

export default function TrendsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-start">
        المؤشرات
        <span className="block text-base text-muted">Trends</span>
      </h1>
      <p className="mt-2 max-w-prose text-muted text-start">
        These are 24-hour aggregates from your wearables. Raw samples are not
        shown here — your clinician sees those in the doctor console.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TrendCard title={{ ar: "متوسط نبض القلب", en: "Heart rate (avg)" }}>
          <TrendChart
            data={[72, 75, 71, 73, 78, 80, 76, 74, 73, 75, 78, 82]}
            unit="bpm"
          />
        </TrendCard>
        <TrendCard title={{ ar: "تنوع نبض القلب", en: "HRV (RMSSD)" }}>
          <TrendChart
            data={[42, 45, 47, 41, 39, 38, 44, 46, 48, 45, 42, 40]}
            unit="ms"
          />
        </TrendCard>
        <TrendCard title={{ ar: "النوم", en: "Sleep performance" }}>
          <TrendChart
            data={[78, 82, 76, 80, 85, 83, 79]}
            unit="%"
          />
        </TrendCard>
        <TrendCard title={{ ar: "Whoop strain", en: "Whoop strain" }}>
          <TrendChart
            data={[10, 12, 14, 9, 11, 13, 15, 12, 11, 14, 13, 12]}
            unit="strain"
          />
        </TrendCard>
      </div>
    </div>
  );
}

function TrendCard({
  title,
  children,
}: {
  title: { ar: string; en: string };
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h2 className="text-sm font-semibold text-start">
        {title.ar}
        <span className="text-muted text-xs ms-2">/ {title.en}</span>
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
