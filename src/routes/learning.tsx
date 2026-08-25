import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/workmate/ComingSoon";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning — WorkMate AI" },
      { name: "description", content: "Guided learning paths for IT support, cloud engineering and workplace productivity." },
      { property: "og:title", content: "Learning — WorkMate AI" },
      { property: "og:description", content: "Skill paths and practice scenarios for IT and cloud support professionals." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Learning"
      subtitle="Skill paths for IT and cloud support"
      message="Pick a track — networking, identity, cloud fundamentals — and WorkMate AI will build a practice plan."
      actionLabel="Build a learning plan"
    />
  ),
});
