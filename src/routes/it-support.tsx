import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/workmate/AppShell";
import { AiTag, HealthBadge, PriorityBadge } from "@/components/workmate/status";
import { Button } from "@/components/ui/button";
import { systems, tickets } from "@/lib/workmate-data";

export const Route = createFileRoute("/it-support")({
  head: () => ({
    meta: [
      { title: "IT Support — WorkMate AI" },
      {
        name: "description",
        content:
          "Structured troubleshooting workspace: evidence, possible causes, diagnostic tests, findings and resolution.",
      },
      { property: "og:title", content: "IT Support — WorkMate AI" },
      { property: "og:description", content: "Evidence-driven IT troubleshooting with AI guidance." },
    ],
  }),
  component: ItSupport,
});

const steps = [
  { title: "Evidence", body: "Collect error messages, logs and recent changes." },
  { title: "Possible causes", body: "Rank likely causes by probability and impact." },
  { title: "Diagnostic tests", body: "Run recommended, low-risk checks in order." },
  { title: "Findings", body: "Record what each test proved or ruled out." },
  { title: "Resolution", body: "Apply the fix, verify, then document the runbook." },
];

function ItSupport() {
  return (
    <AppShell title="IT Support" subtitle="Structured, evidence-driven troubleshooting">
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="surface-panel p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Troubleshooting flow</h2>
            <AiTag />
          </div>
          <ol className="mt-4 space-y-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-3 rounded-lg border border-border bg-elevated p-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent text-xs font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button size="sm" className="mt-4">Start guided diagnosis</Button>
        </section>

        <div className="space-y-4">
          <section className="surface-panel">
            <header className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold">Active incidents</h2>
            </header>
            <ul className="divide-y divide-border">
              {tickets.filter((t) => t.status !== "Resolved").slice(0, 4).map((t) => (
                <li key={t.id} className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
                    <PriorityBadge priority={t.priority} />
                  </div>
                  <p className="mt-1 text-sm">{t.title}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-panel">
            <header className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold">System health</h2>
            </header>
            <ul className="divide-y divide-border">
              {systems.slice(0, 4).map((s) => (
                <li key={s.name} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="min-w-0 flex-1 truncate text-sm">{s.name}</span>
                  <HealthBadge status={s.status} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
