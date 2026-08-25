import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/workmate/AppShell";
import { Button } from "@/components/ui/button";

export function ComingSoon({
  title,
  subtitle,
  message,
  actionLabel = "Ask WorkMate AI",
}: {
  title: string;
  subtitle: string;
  message: string;
  actionLabel?: string;
}) {
  return (
    <AppShell title={title} subtitle={subtitle}>
      <div className="surface-panel flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
        <span className="grid size-10 place-items-center rounded-lg border border-ai/40 bg-ai-soft text-ai">
          <Sparkles className="size-5" />
        </span>
        <h2 className="text-base font-semibold">{title} workspace</h2>
        <p className="max-w-md text-sm text-muted-foreground">{message}</p>
        <Button asChild size="sm" className="mt-2">
          <Link to="/copilot">{actionLabel}</Link>
        </Button>
      </div>
    </AppShell>
  );
}
