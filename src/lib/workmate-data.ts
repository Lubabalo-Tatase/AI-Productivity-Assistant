export type Severity = "critical" | "high" | "medium" | "low";
export type Health = "healthy" | "degraded" | "investigating" | "down";

export const metrics = [
  { label: "Open Tickets", value: "24", delta: "2 high priority", tone: "warning" as const },
  { label: "Cloud Health", value: "98.7%", delta: "Healthy", tone: "success" as const },
  { label: "Avg Resolution", value: "3h 12m", delta: "-18% vs last week", tone: "info" as const },
  { label: "Productivity", value: "+24%", delta: "vs last week", tone: "ai" as const },
];

export const systems: { name: string; status: Health; detail: string }[] = [
  { name: "Network", status: "healthy", detail: "Latency 22ms" },
  { name: "Microsoft 365", status: "degraded", detail: "Exchange delays" },
  { name: "Authentication", status: "healthy", detail: "SSO nominal" },
  { name: "Cloud Services", status: "healthy", detail: "3 regions" },
  { name: "Storage", status: "investigating", detail: "Volume alerts" },
  { name: "Applications", status: "healthy", detail: "42 monitored" },
];

export type Ticket = {
  id: string;
  title: string;
  category: string;
  priority: Severity;
  status: "Open" | "In Progress" | "Waiting" | "Resolved";
  assignee: string;
  updated: string;
  sla: string;
};

export const tickets: Ticket[] = [
  { id: "WM-2451", title: "VPN disconnects for remote finance team", category: "Network", priority: "critical", status: "In Progress", assignee: "N. Dlamini", updated: "6m ago", sla: "42m left" },
  { id: "WM-2450", title: "Outlook not syncing after password reset", category: "Microsoft 365", priority: "high", status: "Open", assignee: "Unassigned", updated: "21m ago", sla: "2h left" },
  { id: "WM-2447", title: "S3 bucket policy blocking report export", category: "Cloud / AWS", priority: "high", status: "In Progress", assignee: "T. Mokoena", updated: "48m ago", sla: "1h 10m left" },
  { id: "WM-2443", title: "New starter laptop imaging request", category: "Hardware", priority: "medium", status: "Waiting", assignee: "S. Petersen", updated: "2h ago", sla: "1d left" },
  { id: "WM-2438", title: "Azure AD group membership audit", category: "Identity", priority: "low", status: "Open", assignee: "R. Naidoo", updated: "5h ago", sla: "3d left" },
  { id: "WM-2431", title: "Printer queue stuck on floor 3", category: "Peripherals", priority: "medium", status: "Resolved", assignee: "N. Dlamini", updated: "Yesterday", sla: "Met" },
];

export const activity = [
  { actor: "WorkMate AI", ai: true, text: "Drafted a root-cause summary for WM-2451 from 3 log sources.", time: "4m ago" },
  { actor: "T. Mokoena", ai: false, text: "Applied IAM policy fix to reporting-exports bucket.", time: "31m ago" },
  { actor: "WorkMate AI", ai: true, text: "Suggested merging 4 duplicate Outlook sync tickets.", time: "1h ago" },
  { actor: "S. Petersen", ai: false, text: "Closed WM-2431 — printer spooler restarted.", time: "3h ago" },
];

export const cloudResources = {
  AWS: [
    { name: "Compute (EC2)", used: 68, detail: "42 / 62 instances active" },
    { name: "Storage (S3)", used: 54, detail: "8.4 TB of 15 TB" },
    { name: "Network", used: 31, detail: "3 VPCs · 12 subnets" },
    { name: "IAM", used: 22, detail: "184 principals · 3 stale keys" },
  ],
  Azure: [
    { name: "Compute (VMs)", used: 47, detail: "18 / 38 VMs running" },
    { name: "Blob Storage", used: 61, detail: "5.1 TB of 8.3 TB" },
    { name: "Entra ID", used: 40, detail: "912 users · 41 guests" },
    { name: "Monitoring", used: 12, detail: "2 open alerts" },
  ],
  "Google Cloud": [
    { name: "Compute Engine", used: 35, detail: "11 / 30 instances" },
    { name: "Cloud Storage", used: 28, detail: "2.2 TB of 8 TB" },
    { name: "Networking", used: 19, detail: "2 VPCs · 6 routes" },
    { name: "IAM", used: 44, detail: "310 bindings" },
  ],
} as const;

export const ticketVolume = [
  { day: "Mon", opened: 18, resolved: 15 },
  { day: "Tue", opened: 24, resolved: 21 },
  { day: "Wed", opened: 21, resolved: 24 },
  { day: "Thu", opened: 29, resolved: 26 },
  { day: "Fri", opened: 17, resolved: 22 },
  { day: "Sat", opened: 6, resolved: 8 },
  { day: "Sun", opened: 4, resolved: 5 },
];

export type Task = {
  id: string;
  title: string;
  column: "Backlog" | "To Do" | "In Progress" | "Review" | "Done";
  priority: Severity;
  due: string;
  assignee: string;
  effort: string;
  aiHint?: string;
};

export const tasks: Task[] = [
  { id: "T-101", title: "Document VPN failover runbook", column: "Backlog", priority: "medium", due: "Fri", assignee: "N. Dlamini", effort: "3h" },
  { id: "T-102", title: "Rotate stale AWS access keys", column: "To Do", priority: "high", due: "Tomorrow", assignee: "T. Mokoena", effort: "1h", aiHint: "3 keys older than 180 days detected" },
  { id: "T-103", title: "Patch Exchange hybrid connector", column: "In Progress", priority: "critical", due: "Today", assignee: "R. Naidoo", effort: "2h" },
  { id: "T-104", title: "Review Q3 SLA report", column: "Review", priority: "low", due: "Next week", assignee: "S. Petersen", effort: "45m" },
  { id: "T-105", title: "Onboard 6 new starters", column: "Done", priority: "medium", due: "Done", assignee: "S. Petersen", effort: "4h" },
  { id: "T-106", title: "Set up storage volume alerting", column: "To Do", priority: "high", due: "Thu", assignee: "T. Mokoena", effort: "90m", aiHint: "Linked to 2 open storage incidents" },
];
