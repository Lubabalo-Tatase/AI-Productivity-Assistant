import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/workmate/AppShell";
import { AiTag, PriorityBadge } from "@/components/workmate/status";
import { tasks, type Task } from "@/lib/workmate-data";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — WorkMate AI Kanban" },
      {
        name: "description",
        content:
          "Plan and track IT and workplace tasks across Backlog, To Do, In Progress, Review and Done with AI prioritisation hints.",
      },
      { property: "og:title", content: "Tasks — WorkMate AI Kanban" },
      {
        property: "og:description",
        content: "Kanban task board with priority, effort estimates and AI recommendations.",
      },
    ],
  }),
  component: Tasks,
});

const columns: Task["column"][] = ["Backlog", "To Do", "In Progress", "Review", "Done"];

function Tasks() {
  return (
    <AppShell title="Tasks" subtitle="Board view with AI prioritisation hints">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        {columns.map((col) => {
          const items = tasks.filter((t) => t.column === col);
          return (
            <section key={col} className="surface-panel flex flex-col">
              <header className="flex items-center justify-between border-b border-border px-3 py-2.5">
                <h2 className="text-xs font-semibold uppercase tracking-wide">{col}</h2>
                <span className="text-xs text-muted-foreground">{items.length}</span>
              </header>
              <ul className="flex-1 space-y-2 p-2">
                {items.length === 0 && (
                  <li className="rounded-md border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                    Nothing here yet
                  </li>
                )}
                {items.map((t) => (
                  <li key={t.id} className="rounded-md border border-border bg-elevated p-3">
                    <p className="text-sm font-medium leading-snug">{t.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <PriorityBadge priority={t.priority} />
                      <span className="text-[11px] text-muted-foreground">{t.due}</span>
                      <span className="text-[11px] text-muted-foreground">· {t.effort}</span>
                    </div>
                    {t.aiHint && (
                      <div className="mt-2 rounded-md border border-ai/30 bg-ai-soft/60 p-2">
                        <AiTag />
                        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{t.aiHint}</p>
                      </div>
                    )}
                    <p className="mt-2 text-[11px] text-muted-foreground">{t.assignee}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
