import type { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  variant?: "default" | "muted";
}

export function Section({
  id,
  title,
  lead,
  children,
  variant = "default",
}: SectionProps) {
  const bg = variant === "muted" ? "bg-surface" : "bg-background";
  return (
    <section id={id} className={`${bg} w-full`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        {title ? (
          <h2 className="text-2xl sm:text-3xl font-bold text-start mb-4">
            {title}
          </h2>
        ) : null}
        {lead ? (
          <p className="text-base sm:text-lg text-muted text-start max-w-3xl mb-8">
            {lead}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
