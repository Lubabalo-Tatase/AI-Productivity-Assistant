import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/workmate/ComingSoon";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Base — WorkMate AI" },
      { name: "description", content: "SOPs, runbooks, knowledge articles and incident reports for your support team." },
      { property: "og:title", content: "Knowledge Base — WorkMate AI" },
      { property: "og:description", content: "Searchable runbooks and SOPs generated from resolved incidents." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Knowledge Base"
      subtitle="Runbooks, SOPs and incident reports"
      message="No articles yet. Resolve an incident and WorkMate AI can draft the runbook for you."
      actionLabel="Draft an article"
    />
  ),
});
