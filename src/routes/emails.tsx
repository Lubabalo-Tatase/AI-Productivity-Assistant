import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/workmate/ComingSoon";

export const Route = createFileRoute("/emails")({
  head: () => ({
    meta: [
      { title: "Emails — WorkMate AI" },
      { name: "description", content: "Triage, summarise and draft professional email replies with WorkMate AI." },
      { property: "og:title", content: "Emails — WorkMate AI" },
      { property: "og:description", content: "AI-assisted email triage and drafting for busy support teams." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Emails"
      subtitle="Triage, summarise and draft replies"
      message="Connect a mailbox to summarise threads, extract requests and draft professional replies."
    />
  ),
});
