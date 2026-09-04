import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MetricsEntryModal, type MetricsValues } from "@/components/metrics-entry-modal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Today's Snapshot — Daily Metrics Tracker" },
      { name: "description", content: "Log your daily sleep, water, study, movement, energy and screen time with a quick snapshot entry form." },
      { property: "og:title", content: "Today's Snapshot — Daily Metrics Tracker" },
      { property: "og:description", content: "Log your daily sleep, water, study, movement, energy and screen time with a quick snapshot entry form." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [open, setOpen] = useState(false);
  const [lastEntry, setLastEntry] = useState<MetricsValues | null>(null);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8 px-4"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="text-center">
        <h1
          className="bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          style={{ backgroundImage: "linear-gradient(90deg, var(--metric-screen), var(--brand), var(--metric-sleep))" }}
        >
          Today's snapshot
        </h1>
        <p className="mt-3 text-muted-foreground">Track your day in six numbers. Real data only.</p>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-[1.03]"
        style={{
          background: "linear-gradient(90deg, var(--metric-screen), var(--brand), var(--metric-sleep))",
          boxShadow: "0 10px 40px -8px color-mix(in oklch, var(--brand) 60%, transparent)",
        }}
      >
        Enter your metrics
      </button>

      {lastEntry && (
        <p className="text-sm text-muted-foreground">
          Last entry saved — sleep {lastEntry.sleep}h · water {lastEntry.water}ml · energy {lastEntry.energy}/10
        </p>
      )}

      <MetricsEntryModal open={open} onClose={() => setOpen(false)} onSaved={setLastEntry} />
    </div>
  );
}
