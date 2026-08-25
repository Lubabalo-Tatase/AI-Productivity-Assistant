import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/workmate/ComingSoon";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — WorkMate AI" },
      { name: "description", content: "Guides, keyboard shortcuts and support for using WorkMate AI day to day." },
      { property: "og:title", content: "Help — WorkMate AI" },
      { property: "og:description", content: "Shortcuts, guides and support for WorkMate AI." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Help"
      subtitle="Guides, shortcuts and support"
      message="Press Ctrl + K anywhere to open the command center. Full documentation is on the way."
    />
  ),
});
