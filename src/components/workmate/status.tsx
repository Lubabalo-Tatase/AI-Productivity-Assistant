import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle2, CircleDot, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Health, Severity } from "@/lib/workmate-data";

const badge = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
  {
    variants: {
      tone: {
        neutral: "border-border bg-muted text-muted-foreground",
        success: "border-success/30 bg-success-soft text-success",
        warning: "border-warning/30 bg-warning-soft text-warning",
        danger: "border-destructive/30 bg-destructive-soft text-destructive",
        info: "border-info/30 bg-info-soft text-info",
        ai: "border-ai/40 bg-ai-soft text-ai",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function StatusBadge({
  children,
  tone,
  className,
  icon: Icon,
}: VariantProps<typeof badge> & {
  children: React.ReactNode;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <span className={cn(badge({ tone }), className)}>
      {Icon ? <Icon className="size-3" /> : null}
      {children}
    </span>
  );
}

const severityTone: Record<Severity, "danger" | "warning" | "info" | "neutral"> = {
  critical: "danger",
  high: "warning",
  medium: "info",
  low: "neutral",
};

const severityIcon: Record<Severity, React.ComponentType<{ className?: string }>> = {
  critical: ShieldAlert,
  high: AlertTriangle,
  medium: Info,
  low: CircleDot,
};

export function PriorityBadge({ priority }: { priority: Severity }) {
  return (
    <StatusBadge tone={severityTone[priority]} icon={severityIcon[priority]}>
      {priority}
    </StatusBadge>
  );
}

const healthMap: Record<
  Health,
  { tone: "success" | "warning" | "info" | "danger"; label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  healthy: { tone: "success", label: "Healthy", icon: CheckCircle2 },
  degraded: { tone: "warning", label: "Degraded", icon: AlertTriangle },
  investigating: { tone: "info", label: "Investigating", icon: Info },
  down: { tone: "danger", label: "Down", icon: ShieldAlert },
};

export function HealthBadge({ status }: { status: Health }) {
  const h = healthMap[status];
  return (
    <StatusBadge tone={h.tone} icon={h.icon}>
      {h.label}
    </StatusBadge>
  );
}

export function AiTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-ai/40 bg-ai-soft px-1.5 py-0.5 text-[11px] font-semibold text-ai",
        className,
      )}
    >
      ✦ WorkMate AI
    </span>
  );
}
