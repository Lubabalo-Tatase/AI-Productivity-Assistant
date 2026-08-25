import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/workmate/ComingSoon";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — WorkMate AI" },
      { name: "description", content: "Configure theme, notifications, integrations and AI behaviour for WorkMate AI." },
      { property: "og:title", content: "Settings — WorkMate AI" },
      { property: "og:description", content: "Workspace, theme and AI configuration for WorkMate AI." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Settings"
      subtitle="Workspace, theme and AI preferences"
      message="Theme selection is available from the top bar. Integrations and AI guardrails land here next."
    />
  ),
});
