import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/workmate/AppShell";
import { AiTag, HealthBadge, StatusBadge } from "@/components/workmate/status";
import { Progress } from "@/components/ui/progress";
import { cloudResources, systems } from "@/lib/workmate-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cloud")({
  head: () => ({
    meta: [
      { title: "Cloud Support — WorkMate AI" },
      {
        name: "description",
        content:
          "Cloud operations workspace for AWS, Azure and Google Cloud: resource utilisation, IAM posture and service health.",
      },
      { property: "og:title", content: "Cloud Support — WorkMate AI" },
      {
        property: "og:description",
        content: "Monitor AWS, Azure and Google Cloud resources with AI-assisted cloud support.",
      },
    ],
  }),
  component: CloudSupport,
});

const providers = ["AWS", "Azure", "Google Cloud"] as const;

function CloudSupport() {
  const [provider, setProvider] = useState<(typeof providers)[number]>("AWS");

  return (
    <AppShell title="Cloud Support" subtitle="Multi-cloud resource posture and operational health">
      <div className="mb-4 inline-flex rounded-lg border border-border bg-surface p-1">
        {providers.map((p) => (
          <button
            key={p}
            onClick={() => setProvider(p)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              provider === p
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="surface-panel p-4 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">{provider} resource overview</h2>
            <StatusBadge tone="info">Live inventory</StatusBadge>
          </div>
          <ul className="space-y-4">
            {cloudResources[provider].map((r) => (
              <li key={r.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.detail}</span>
                </div>
                <Progress value={r.used} className="h-1.5" />
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-panel">
          <header className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Service health</h2>
          </header>
          <ul className="divide-y divide-border">
            {systems.map((s) => (
              <li key={s.name} className="flex items-center gap-3 px-4 py-2.5">
                <span className="min-w-0 flex-1 truncate text-sm">{s.name}</span>
                <HealthBadge status={s.status} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-4 surface-panel p-4">
        <AiTag />
        <p className="mt-2 text-sm">
          3 IAM access keys in {provider} are older than 180 days. Rotating them reduces credential
          exposure. This is a recommendation — no change has been applied.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Impact if applied: affects 2 automation pipelines · requires secret update in CI.
        </p>
      </div>
    </AppShell>
  );
}
