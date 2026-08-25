import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/workmate/AppShell";
import { StatusBadge } from "@/components/workmate/status";
import { ticketVolume } from "@/lib/workmate-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — WorkMate AI" },
      { name: "description", content: "Ticket volume, resolution time and SLA performance analytics for support operations." },
      { property: "og:title", content: "Analytics — WorkMate AI" },
      { property: "og:description", content: "Operational analytics: ticket volume, resolution time and SLA performance." },
    ],
  }),
  component: Analytics,
});

const kpis = [
  { label: "SLA performance", value: "96.2%" },
  { label: "First-contact resolution", value: "71%" },
  { label: "Median resolution", value: "2h 41m" },
  { label: "Reopen rate", value: "3.1%" },
];

function Analytics() {
  return (
    <AppShell title="Analytics" subtitle="Operational performance across support and cloud">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="surface-panel p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{k.value}</p>
          </div>
        ))}
      </div>

      <section className="surface-panel mt-4 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Opened vs resolved</h2>
          <StatusBadge tone="info">Last 7 days</StatusBadge>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ticketVolume} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "var(--color-elevated)" }}
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  color: "var(--color-popover-foreground)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="opened" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </AppShell>
  );
}
