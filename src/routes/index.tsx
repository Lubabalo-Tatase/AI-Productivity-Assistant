import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/workmate/AppShell";
import { AiTag, HealthBadge, PriorityBadge, StatusBadge } from "@/components/workmate/status";
import { Button } from "@/components/ui/button";
import { activity, metrics, systems, ticketVolume, tickets } from "@/lib/workmate-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkMate AI — Workplace & IT Operations Overview" },
      {
        name: "description",
        content:
          "WorkMate AI overview: ticket queue, cloud health, system status and AI copilot insights for IT and cloud support teams.",
      },
      { property: "og:title", content: "WorkMate AI — Workplace & IT Operations Overview" },
      {
        property: "og:description",
        content: "Your intelligent workplace & IT copilot: triage tickets, monitor cloud health, resolve faster.",
      },
    ],
  }),
  component: Overview,
});

const toneClass = {
  warning: "text-warning",
  success: "text-success",
  info: "text-info",
  ai: "text-ai",
} as const;

function Overview() {
  return (
    <AppShell title="Overview" subtitle="What needs your attention right now">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="surface-panel p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {m.label}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{m.value}</p>
            <p className={`mt-1 text-xs font-medium ${toneClass[m.tone]}`}>{m.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="surface-panel lg:col-span-2">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Priority queue</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/tickets">
                All tickets <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </header>
          <ul className="divide-y divide-border">
            {tickets.slice(0, 4).map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{t.title}</span>
                <PriorityBadge priority={t.priority} />
                <span className="text-xs text-muted-foreground">{t.sla}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-panel">
          <header className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">System health</h2>
          </header>
          <ul className="divide-y divide-border">
            {systems.map((s) => (
              <li key={s.name} className="flex items-center gap-3 px-4 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.detail}</p>
                </div>
                <HealthBadge status={s.status} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="surface-panel p-4 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Ticket volume vs resolution</h2>
            <StatusBadge tone="info">Last 7 days</StatusBadge>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ticketVolume} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="opened" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="resolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    color: "var(--color-popover-foreground)",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="opened" stroke="var(--color-chart-1)" fill="url(#opened)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" stroke="var(--color-chart-3)" fill="url(#resolved)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-panel">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">Recent activity</h2>
            <Sparkles className="size-4 text-ai" />
          </header>
          <ul className="divide-y divide-border">
            {activity.map((a, i) => (
              <li key={i} className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {a.ai ? (
                    <AiTag />
                  ) : (
                    <span className="text-xs font-semibold">{a.actor}</span>
                  )}
                  <span className="ml-auto text-[11px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{a.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
