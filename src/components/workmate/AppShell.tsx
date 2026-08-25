import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Cloud,
  CalendarDays,
  CheckSquare,
  ChevronLeft,
  CircleHelp,
  Command as CommandIcon,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Monitor,
  Moon,
  Search,
  Settings,
  Sun,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Overview", to: "/", icon: LayoutDashboard },
  { label: "AI Copilot", to: "/copilot", icon: Bot },
  { label: "Tasks", to: "/tasks", icon: CheckSquare },
  { label: "Meetings", to: "/meetings", icon: CalendarDays },
  { label: "Emails", to: "/emails", icon: Mail },
  { label: "IT Support", to: "/it-support", icon: LifeBuoy },
  { label: "Cloud Support", to: "/cloud", icon: Cloud },
  { label: "Tickets", to: "/tickets", icon: Ticket },
  { label: "Knowledge Base", to: "/knowledge", icon: BookOpen },
  { label: "Learning", to: "/learning", icon: GraduationCap },
] as const;

const lowerNav = [
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Help", to: "/help", icon: CircleHelp },
] as const;

type Theme = "dark" | "light" | "system";

function applyTheme(theme: Theme) {
  const prefersDark =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : theme === "dark";
  document.documentElement.classList.toggle("dark", prefersDark);
}

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem("workmate-theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("workmate-theme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:flex",
          collapsed ? "w-[68px]" : "w-64",
        )}
      >
        <div className="flex h-14 items-center gap-2 px-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            WM
          </span>
          {!collapsed && (
            <span className="truncate text-sm font-semibold tracking-tight">WorkMate AI</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-auto size-7 text-muted-foreground"
            onClick={() => setCollapsed((v) => !v)}
          >
            <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-3">
          {mainNav.map((item) => (
            <NavLink key={item.to} {...item} active={pathname === item.to} collapsed={collapsed} />
          ))}
          <div className="my-3 border-t border-sidebar-border" />
          {lowerNav.map((item) => (
            <NavLink key={item.to} {...item} active={pathname === item.to} collapsed={collapsed} />
          ))}
        </nav>

        {!collapsed && (
          <div className="m-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
            <p className="text-xs font-semibold text-sidebar-accent-foreground">Copilot ready</p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              Ask WorkMate AI to triage, diagnose, or document — evidence first.
            </p>
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-surface/90 px-4 backdrop-blur">
          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-full max-w-md items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-ring/60"
          >
            <Search className="size-4" />
            Search WorkMate AI...
            <kbd className="ml-auto inline-flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[10px] font-medium">
              <CommandIcon className="size-3" />K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-warning" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Theme">
                  {theme === "light" ? (
                    <Sun className="size-4" />
                  ) : theme === "system" ? (
                    <Monitor className="size-4" />
                  ) : (
                    <Moon className="size-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted">
                  <span className="grid size-7 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    LT
                  </span>
                  <span className="hidden leading-tight sm:block">
                    <span className="block text-xs font-medium">Lubabalo Tatase</span>
                    <span className="block text-[11px] text-muted-foreground">Cloud Support Eng.</span>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-6">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight md:text-[32px] md:leading-tight">
                  {title}
                </h1>
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Activity className="size-3.5 text-success" />
                All monitors reporting
              </span>
            </div>
            {children}
          </div>
        </main>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tickets, docs, cloud resources or ask AI..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {[...mainNav, ...lowerNav].map((item) => (
              <CommandItem key={item.to} value={item.label} onSelect={() => setOpen(false)} asChild>
                <Link to={item.to}>
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

function NavLink({
  label,
  to,
  icon: Icon,
  active,
  collapsed,
}: {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
      )}
    >
      <Icon className={cn("size-4 shrink-0", active && "text-sidebar-primary")} />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
