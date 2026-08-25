import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CornerDownLeft, FileText, ListChecks, Server, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/workmate/AppShell";
import { AiTag, StatusBadge } from "@/components/workmate/status";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "AI Copilot — WorkMate AI" },
      {
        name: "description",
        content:
          "Evidence-driven AI copilot for IT and cloud support: triage incidents, draft runbooks and diagnose issues step by step.",
      },
      { property: "og:title", content: "AI Copilot — WorkMate AI" },
      {
        property: "og:description",
        content: "Ask WorkMate AI to triage incidents, diagnose faults and draft documentation.",
      },
    ],
  }),
  component: Copilot,
});

const suggestions = [
  { label: "Diagnose VPN drops for finance team", icon: Server },
  { label: "Draft a runbook for Exchange sync failures", icon: FileText },
  { label: "Summarise today's incidents into actions", icon: ListChecks },
  { label: "Review IAM keys older than 180 days", icon: ShieldCheck },
];

const thread = [
  {
    role: "user" as const,
    text: "Users on the finance floor keep losing VPN after ~10 minutes. Where do I start?",
  },
  {
    role: "ai" as const,
    text: "Here is an evidence-first diagnostic path. I have not run any commands — these are recommendations only.",
    blocks: [
      { title: "Evidence", body: "3 tickets in 40 min, all on subnet 10.40.12.0/24. Gateway logs show IKE rekey failures at 600s." },
      { title: "Possible causes", body: "1. Phase 2 lifetime mismatch after last firewall change  ·  2. MTU fragmentation on the new ISP link  ·  3. RADIUS session timeout" },
      { title: "Diagnostic tests", body: "Compare Phase 2 lifetime on both peers, run ping with DF bit at 1400/1360, check RADIUS Session-Timeout attribute." },
      { title: "Next step", body: "Start with the rekey mismatch — it matches the 10-minute pattern exactly." },
    ],
  },
];

function Copilot() {
  const [input, setInput] = useState("");

  return (
    <AppShell title="AI Copilot" subtitle="Evidence-driven assistance for workplace, IT and cloud support">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="surface-panel flex min-h-[560px] flex-col">
          <header className="flex items-center gap-2 border-b border-border px-4 py-3">
            <AiTag />
            <span className="text-xs text-muted-foreground">Transparent · cites evidence · never fabricates logs</span>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto p-4">
            {thread.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[80%] rounded-lg rounded-br-sm bg-accent px-3 py-2 text-sm text-accent-foreground">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={i} className="max-w-[92%] space-y-3">
                  <AiTag />
                  <p className="text-sm text-muted-foreground">{m.text}</p>
                  <div className="space-y-2">
                    {m.blocks?.map((b) => (
                      <div key={b.title} className="rounded-lg border border-border bg-elevated p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{b.title}</p>
                        <p className="mt-1 text-sm leading-relaxed">{b.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="secondary">Create ticket</Button>
                    <Button size="sm" variant="secondary">Save as runbook</Button>
                    <Button size="sm" variant="ghost">Copy</Button>
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="border-t border-border p-3">
            <div className="rounded-lg border border-border bg-background p-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the issue, paste an error or ask WorkMate AI..."
                className="min-h-[72px] resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-muted-foreground">
                  Recommendations only — no action is performed without confirmation.
                </span>
                <Button size="sm" disabled={!input.trim()}>
                  Send <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="surface-panel p-4">
            <h2 className="text-sm font-semibold">Suggested prompts</h2>
            <ul className="mt-3 space-y-2">
              {suggestions.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => setInput(s.label)}
                    className="flex w-full items-start gap-2 rounded-md border border-border bg-elevated px-3 py-2 text-left text-sm transition-colors hover:border-ring/60"
                  >
                    <s.icon className="mt-0.5 size-4 shrink-0 text-primary" />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-panel p-4">
            <h2 className="text-sm font-semibold">Context in use</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge tone="info">6 open tickets</StatusBadge>
              <StatusBadge tone="warning">1 degraded service</StatusBadge>
              <StatusBadge tone="neutral">Knowledge base</StatusBadge>
              <StatusBadge tone="ai">Cloud inventory</StatusBadge>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              WorkMate AI states its assumptions, flags uncertainty and clearly separates recommendations
              from actions actually performed.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
