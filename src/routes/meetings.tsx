import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/workmate/ComingSoon";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meetings — WorkMate AI" },
      { name: "description", content: "Turn meetings into summaries, action items and tasks without re-entering information." },
      { property: "og:title", content: "Meetings — WorkMate AI" },
      { property: "og:description", content: "Meeting summaries, extracted actions and follow-up drafts." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Meetings"
      subtitle="Meeting → summary → action items → tasks"
      message="Connect a calendar to summarise meetings, extract action items and create tasks in one flow."
    />
  ),
});
