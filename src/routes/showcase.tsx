import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  Github,
  Globe,
  Linkedin,
  Mail,
  NotebookPen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* EDIT ME — placeholder content                                       */
/* ------------------------------------------------------------------ */
const AUTHOR_NAME = "[Your Name]";
const GITHUB_URL = "[github.com/your-username/your-repo]";
const LINKEDIN_URL = "[linkedin.com/in/your-profile]";
const DEMO_URL = "[your-live-demo-link.com]";
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant — Project Showcase" },
      {
        name: "description",
        content:
          "A 6-slide showcase of the AI Workplace Productivity Assistant: four AI tools, prompt engineering approach, and responsible AI design.",
      },
      {
        property: "og:title",
        content: "AI Workplace Productivity Assistant — Project Showcase",
      },
      {
        property: "og:description",
        content:
          "One dashboard. Four AI-powered tools. Real workplace problems solved.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShowcasePage,
});

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute -bottom-40 -right-24 h-[30rem] w-[30rem] rounded-full bg-ai/15 blur-[130px]" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="wm-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wm-grid)" />
      </svg>
    </div>
  );
}

function NetworkGraphic() {
  const nodes = [
    [12, 30],
    [30, 14],
    [50, 34],
    [72, 18],
    [88, 40],
    [22, 62],
    [46, 78],
    [70, 60],
    [90, 78],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [2, 6],
    [6, 7],
    [7, 4],
    [7, 8],
    [2, 7],
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 90"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a]![0]}
          y1={nodes[a]![1]}
          x2={nodes[b]![0]}
          y2={nodes[b]![1]}
          stroke="currentColor"
          strokeWidth="0.18"
          className="text-primary"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 0.9 : 0.55}
          className={i % 3 === 0 ? "text-ai" : "text-primary"}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
      {children}
    </span>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
      {children}
    </h2>
  );
}

/* ------------------------------- slides ------------------------------- */

function SlideTitle() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
      <NetworkGraphic />
      <div className="relative max-w-3xl">
        <div className="anim" style={{ animationDelay: "0ms" }}>
          <Kicker>
            <Sparkles className="h-3.5 w-3.5" /> Project Showcase
          </Kicker>
        </div>
        <h1
          className="anim mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          AI Workplace
          <br />
          <span className="bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
            Productivity Assistant
          </span>
        </h1>
        <p
          className="anim mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          One dashboard. Four AI-powered tools. Real workplace problems solved.
        </p>
        <p
          className="anim mt-10 text-lg font-semibold text-foreground"
          style={{ animationDelay: "240ms" }}
        >
          {AUTHOR_NAME}
        </p>
        <p
          className="anim mt-2 text-xs tracking-wide text-muted-foreground sm:text-sm"
          style={{ animationDelay: "300ms" }}
        >
          Built with Lovable AI | Prompt Engineering | Responsible AI
        </p>
      </div>
    </div>
  );
}

function SlideProblem() {
  return (
    <div className="flex h-full flex-col justify-center px-6 py-10 sm:px-12 lg:px-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="anim" style={{ animationDelay: "0ms" }}>
          <Kicker>01 — Context</Kicker>
          <div className="mt-5">
            <Heading>The Problem</Heading>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
            Professionals lose hours every week to repetitive workplace tasks —
            writing and rewriting emails, summarizing long meetings, planning
            the day, and hunting for quick answers. Worse, each task lives in a
            different tool, so the day becomes a constant context switch between
            disconnected apps.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:text-base">
            {[
              "Repetitive email writing",
              "Messy, unstructured meeting notes",
              "Ad-hoc, unprioritized daily planning",
              "Answers scattered across tools",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="anim surface-panel bg-surface/60 p-6 sm:p-9"
          style={{ animationDelay: "140ms" }}
        >
          <Kicker>02 — Approach</Kicker>
          <div className="mt-5">
            <Heading>The Solution</Heading>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-foreground sm:text-lg">
            A single, integrated AI dashboard that solves all four problems in
            one consistent workspace — instead of four separate apps, four
            logins, and four ways of working.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Email", "Meetings", "Planning", "Chat"].map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-elevated px-3 py-1.5 text-xs font-medium text-foreground sm:text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: Mail,
    name: "Smart Email Generator",
    desc: "Generates professional emails in formal, friendly, or persuasive tones.",
  },
  {
    icon: NotebookPen,
    name: "Meeting Notes Summarizer",
    desc: "Extracts summaries, decisions, action items, and deadlines from raw notes.",
  },
  {
    icon: CalendarClock,
    name: "AI Task Planner",
    desc: "Builds prioritized, time-blocked daily and weekly schedules.",
  },
  {
    icon: Bot,
    name: "AI Chatbot",
    desc: "A conversational workplace assistant for quick questions and drafting help.",
  },
];

function SlideFeatures() {
  return (
    <div className="flex h-full flex-col justify-center px-6 py-10 sm:px-12 lg:px-20">
      <div className="anim">
        <Kicker>Product</Kicker>
        <div className="mt-5">
          <Heading>Four Tools, One Platform</Heading>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {FEATURES.map((f, i) => (
          <div
            key={f.name}
            className="anim surface-panel group bg-surface/70 p-5 transition-colors hover:border-primary/50 sm:p-7"
            style={{ animationDelay: `${100 + i * 90}ms` }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground sm:text-xl">
              {f.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const PROMPT_PARTS = [
  { label: "Role", value: 'You are a professional workplace communication assistant.' },
  { label: "Context / Input", value: "{{ user notes, tone, recipient, constraints }}" },
  { label: "Task", value: "Draft a complete email matching the requested tone." },
  { label: "Output Format", value: "Subject line + body + suggested sign-off." },
  { label: "Constraints", value: "No invented facts, names, dates or commitments." },
];

function SlidePrompting() {
  return (
    <div className="flex h-full flex-col justify-center px-6 py-10 sm:px-12 lg:px-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="anim">
          <Kicker>Prompt Engineering</Kicker>
          <div className="mt-5">
            <Heading>How the AI Was Directed</Heading>
          </div>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-lg">
            Every feature runs on a purpose-built prompt template rather than a
            generic one-off prompt. Each template defines a role, accepts
            structured input, states an explicit output format, and enforces
            clear constraints — so results stay predictable across runs.
          </p>
          <div className="mt-7 rounded-lg border border-ai/40 bg-ai-soft/40 px-4 py-3 text-sm font-medium text-foreground sm:text-base">
            “Structured prompts = consistent, editable, trustworthy AI output.”
          </div>
        </div>

        <div
          className="anim surface-panel overflow-hidden bg-surface/80 font-mono"
          style={{ animationDelay: "140ms" }}
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-elevated px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            <span className="ml-3 text-[11px] tracking-wide text-muted-foreground">
              prompt-template.txt
            </span>
          </div>
          <div className="space-y-3 p-4 sm:p-6">
            {PROMPT_PARTS.map((p, i) => (
              <div key={p.label} className="flex gap-3">
                <span className="w-4 shrink-0 pt-0.5 text-[11px] text-muted-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {p.label}
                  </span>
                  <p className="mt-0.5 break-words text-xs leading-relaxed text-foreground sm:text-sm">
                    {p.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideResponsible() {
  const responsible = [
    "Persistent in-app disclaimer that AI output should be reviewed before use",
    "No fabrication — prompts explicitly instruct the AI not to invent facts, names, or commitments",
    "No sensitive or confidential data encouraged as input",
    "All AI outputs are editable by the user, never auto-sent or auto-applied",
  ];
  const principles = [
    "One consistent design system",
    "Sidebar navigation across every module",
    "Responsive across desktop, tablet and mobile",
    "Clear loading and empty states",
    "Structured, scannable outputs",
  ];
  return (
    <div className="flex h-full flex-col justify-center px-6 py-10 sm:px-12 lg:px-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="anim">
          <Kicker>
            <ShieldCheck className="h-3.5 w-3.5" /> Ethics
          </Kicker>
          <div className="mt-5">
            <Heading>Built Responsibly</Heading>
          </div>
          <ul className="mt-6 space-y-3">
            {responsible.map((t) => (
              <li key={t} className="flex gap-3 text-sm text-muted-foreground sm:text-base">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="anim" style={{ animationDelay: "140ms" }}>
          <Kicker>Craft</Kicker>
          <div className="mt-5">
            <Heading>Design Principles</Heading>
          </div>
          <ul className="mt-6 space-y-3">
            {principles.map((t) => (
              <li key={t} className="flex gap-3 text-sm text-muted-foreground sm:text-base">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SlideClosing() {
  const links = [
    { icon: Github, label: "GitHub repository", value: GITHUB_URL },
    { icon: Linkedin, label: "LinkedIn profile", value: LINKEDIN_URL },
    { icon: Globe, label: "Live demo", value: DEMO_URL },
  ];
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
      <NetworkGraphic />
      <div className="relative w-full max-w-3xl">
        <div className="anim">
          <Kicker>Closing</Kicker>
        </div>
        <h2
          className="anim mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Let’s Connect
        </h2>
        <p
          className="anim mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "150ms" }}
        >
          This project demonstrates practical AI implementation, strong prompt
          engineering, and responsible AI usage inside a real productivity tool.
        </p>
        <div className="mt-9 grid gap-3 sm:grid-cols-3">
          {links.map((l, i) => (
            <div
              key={l.label}
              className="anim surface-panel flex flex-col items-center gap-2 bg-surface/70 px-4 py-5"
              style={{ animationDelay: `${220 + i * 80}ms` }}
            >
              <l.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-semibold text-foreground sm:text-sm">
                {l.label}
              </span>
              <span className="break-all text-[11px] text-muted-foreground">
                {l.value}
              </span>
            </div>
          ))}
        </div>
        <p
          className="anim mt-10 text-xl font-semibold text-foreground sm:text-2xl"
          style={{ animationDelay: "480ms" }}
        >
          Thank you
        </p>
      </div>
    </div>
  );
}

const SLIDES = [
  { id: "title", label: "Title", node: <SlideTitle /> },
  { id: "problem", label: "Problem & Overview", node: <SlideProblem /> },
  { id: "features", label: "Features", node: <SlideFeatures /> },
  { id: "prompting", label: "Prompt Engineering", node: <SlidePrompting /> },
  { id: "responsible", label: "Responsible AI", node: <SlideResponsible /> },
  { id: "closing", label: "Closing", node: <SlideClosing /> },
];

function ShowcasePage() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const go = useCallback(
    (next: number) => setIndex((i) => Math.min(total - 1, Math.max(0, next ?? i))),
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        setIndex((i) => Math.min(total - 1, i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Home") setIndex(0);
      else if (e.key === "End") setIndex(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <main className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background">
      <Backdrop />

      <header className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-10">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-xs font-semibold tracking-tight text-foreground sm:text-sm">
            AI Workplace Productivity Assistant
          </span>
        </div>
        <span className="hidden text-xs text-muted-foreground sm:block">
          {SLIDES[index]!.label}
        </span>
      </header>

      <section className="relative z-10 min-h-0 flex-1">
        <div key={SLIDES[index]!.id} className="slide-enter h-full">
          {SLIDES[index]!.node}
        </div>
      </section>

      <footer className="relative z-10 flex items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-6">
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}: ${s.label}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-primary" : "w-3 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="tabular-nums text-xs font-medium text-muted-foreground sm:text-sm">
            {index + 1} / {total}
          </span>
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-elevated disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label="Next slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </main>
  );
}
