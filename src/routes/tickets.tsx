import { createFileRoute } from "@tanstack/react-router";
import { Filter, Plus } from "lucide-react";
import { AppShell } from "@/components/workmate/AppShell";
import { AiTag, PriorityBadge, StatusBadge } from "@/components/workmate/status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tickets } from "@/lib/workmate-data";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Tickets — WorkMate AI Service Desk" },
      {
        name: "description",
        content:
          "Professional IT service desk queue with priority, SLA status, assignment and AI-suggested resolutions.",
      },
      { property: "og:title", content: "Tickets — WorkMate AI Service Desk" },
      {
        property: "og:description",
        content: "Track, triage and resolve IT tickets with SLA visibility and AI assistance.",
      },
    ],
  }),
  component: Tickets,
});

const statusTone = {
  Open: "info",
  "In Progress": "warning",
  Waiting: "neutral",
  Resolved: "success",
} as const;

function Tickets() {
  return (
    <AppShell title="Tickets" subtitle="Service desk queue with SLA tracking and AI triage">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input placeholder="Filter by ID, title or assignee..." className="h-9 max-w-xs" />
        <Button variant="secondary" size="sm">
          <Filter className="size-4" /> Filters
        </Button>
        <Button size="sm" className="ml-auto">
          <Plus className="size-4" /> New ticket
        </Button>
      </div>

      <div className="surface-panel overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Ticket</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Assignee</th>
              <th className="px-4 py-3 font-medium">SLA</th>
              <th className="px-4 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tickets.map((t) => (
              <tr key={t.id} className="transition-colors hover:bg-elevated">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <p className="mt-0.5 font-medium">{t.title}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{t.category}</td>
                <td className="px-4 py-3"><PriorityBadge priority={t.priority} /></td>
                <td className="px-4 py-3">
                  <StatusBadge tone={statusTone[t.status]}>{t.status}</StatusBadge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{t.assignee}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.sla}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 surface-panel p-4">
        <AiTag />
        <p className="mt-2 text-sm">
          4 Outlook sync tickets share the same root cause signature. Merging them would reduce
          duplicate effort by an estimated 2.5 hours.
        </p>
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="secondary">Review suggestion</Button>
          <Button size="sm" variant="ghost">Dismiss</Button>
        </div>
      </div>
    </AppShell>
  );
}
