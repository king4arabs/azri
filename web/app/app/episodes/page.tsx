import { EpisodeForm } from "./episode-form";

export const metadata = {
  title: "AZRI — Log an episode",
  description: "Record a suspected seizure, aura, fall, or other event.",
};

export default function EpisodeLogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-start">
        سجل حدث
        <span className="block text-base text-muted">Log an episode</span>
      </h1>
      <p className="mt-2 max-w-prose text-muted text-start">
        AZRI does not diagnose. We help you record what you experienced so your
        doctor can review it in context.
      </p>
      <div className="mt-6 max-w-xl">
        <EpisodeForm />
      </div>
    </div>
  );
}
