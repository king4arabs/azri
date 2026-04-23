"use client";

/**
 * Tiny zero-dependency sparkline. Real charts (Recharts / VisX) land
 * with the doctor console — patient app intentionally uses sparklines
 * to discourage over-interpretation of single points.
 */
export function TrendChart({
  data,
  unit,
  height = 56,
  width = 220,
}: {
  data: readonly number[];
  unit: string;
  height?: number;
  width?: number;
}) {
  if (data.length === 0) return <div className="text-sm text-muted">—</div>;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = width / Math.max(1, data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${height - ((v - min) / span) * height}`)
    .join(" ");
  const last = data[data.length - 1];

  return (
    <div className="flex items-end justify-between gap-3">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`sparkline of last ${data.length} values`}
        className="text-accent"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          points={points}
        />
      </svg>
      <span className="text-xs text-muted whitespace-nowrap">
        {last} <span className="opacity-70">{unit}</span>
      </span>
    </div>
  );
}
