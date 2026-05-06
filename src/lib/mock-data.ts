export type Client = {
  id: string
  name: string
  company: string
  email: string
  status: "active" | "lead" | "churned" | "prospect"
  totalRevenue: number
  activeProjects: number
  avatarInitials: string
}

export type Project = {
  id: string
  name: string
  client: string
  status: "planning" | "in-progress" | "review" | "completed" | "on-hold"
  budget: number
  spent: number
  progress: number
  dueDate: string
  team: string[]
  priority: "low" | "medium" | "high" | "critical"
}

export type DesignReview = {
  id: string
  title: string
  project: string
  client: string
  status: "pending" | "in-review" | "approved" | "changes-requested" | "rejected"
  reviewer: string
  submittedAt: string
  dueDate: string
  version: number
  type: "figma" | "pdf" | "image"
}

export type Invoice = {
  id: string
  number: string
  client: string
  project: string
  amount: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  issuedDate: string
  dueDate: string
  paidDate: string | null
}

export const clients: Client[] = [
  { id: "c1", name: "Sarah Chen", company: "TechVault Inc.", email: "sarah@techvault.io", status: "active", totalRevenue: 245000, activeProjects: 3, avatarInitials: "SC" },
  { id: "c2", name: "Marcus Rivera", company: "Bloom Health", email: "marcus@bloomhealth.com", status: "active", totalRevenue: 128000, activeProjects: 2, avatarInitials: "MR" },
  { id: "c3", name: "Anya Petrova", company: "NovaCraft Studios", email: "anya@novacraft.co", status: "active", totalRevenue: 87000, activeProjects: 1, avatarInitials: "AP" },
  { id: "c4", name: "James Whitfield", company: "Meridian Partners", email: "james@meridian.com", status: "lead", totalRevenue: 0, activeProjects: 0, avatarInitials: "JW" },
  { id: "c5", name: "Priya Nair", company: "Solis Energy", email: "priya@solisenergy.co", status: "prospect", totalRevenue: 15000, activeProjects: 0, avatarInitials: "PN" },
  { id: "c6", name: "Tom Bradley", company: "UrbanPulse Media", email: "tom@urbanpulse.io", status: "active", totalRevenue: 312000, activeProjects: 2, avatarInitials: "TB" },
  { id: "c7", name: "Kenji Tanaka", company: "Zenith AI", email: "kenji@zenithai.jp", status: "churned", totalRevenue: 56000, activeProjects: 0, avatarInitials: "KT" },
  { id: "c8", name: "Lena Fischer", company: "GreenLoop", email: "lena@greenloop.de", status: "active", totalRevenue: 98000, activeProjects: 1, avatarInitials: "LF" },
]

export const projects: Project[] = [
  { id: "p1", name: "TechVault Platform Redesign", client: "TechVault Inc.", status: "in-progress", budget: 120000, spent: 78400, progress: 65, dueDate: "2026-06-15", team: ["JD", "AK", "ML"], priority: "high" },
  { id: "p2", name: "Bloom Health Mobile App", client: "Bloom Health", status: "in-progress", budget: 85000, spent: 42000, progress: 48, dueDate: "2026-07-01", team: ["JD", "RS"], priority: "high" },
  { id: "p3", name: "NovaCraft Brand Identity", client: "NovaCraft Studios", status: "review", budget: 35000, spent: 31200, progress: 89, dueDate: "2026-05-20", team: ["ML", "KP"], priority: "medium" },
  { id: "p4", name: "UrbanPulse Dashboard", client: "UrbanPulse Media", status: "in-progress", budget: 95000, spent: 55000, progress: 58, dueDate: "2026-08-01", team: ["AK", "RS", "JD"], priority: "medium" },
  { id: "p5", name: "TechVault API Integration", client: "TechVault Inc.", status: "planning", budget: 45000, spent: 2500, progress: 5, dueDate: "2026-09-15", team: ["RS"], priority: "low" },
  { id: "p6", name: "GreenLoop Website", client: "GreenLoop", status: "in-progress", budget: 28000, spent: 19600, progress: 70, dueDate: "2026-05-30", team: ["ML", "KP"], priority: "high" },
  { id: "p7", name: "TechVault Analytics Module", client: "TechVault Inc.", status: "on-hold", budget: 60000, spent: 12000, progress: 20, dueDate: "2026-10-01", team: ["AK"], priority: "low" },
  { id: "p8", name: "Bloom Health Admin Portal", client: "Bloom Health", status: "completed", budget: 42000, spent: 39800, progress: 100, dueDate: "2026-04-01", team: ["JD", "RS"], priority: "medium" },
  { id: "p9", name: "UrbanPulse Content CMS", client: "UrbanPulse Media", status: "review", budget: 68000, spent: 62000, progress: 91, dueDate: "2026-05-25", team: ["AK", "ML"], priority: "high" },
]

export const designReviews: DesignReview[] = [
  { id: "dr1", title: "Homepage Hero Section v3", project: "TechVault Platform Redesign", client: "TechVault Inc.", status: "in-review", reviewer: "Sarah Chen", submittedAt: "2026-04-28", dueDate: "2026-05-02", version: 3, type: "figma" },
  { id: "dr2", title: "Onboarding Flow Screens", project: "Bloom Health Mobile App", client: "Bloom Health", status: "pending", reviewer: "Marcus Rivera", submittedAt: "2026-04-30", dueDate: "2026-05-05", version: 1, type: "figma" },
  { id: "dr3", title: "Brand Guidelines Document", project: "NovaCraft Brand Identity", client: "NovaCraft Studios", status: "approved", reviewer: "Anya Petrova", submittedAt: "2026-04-20", dueDate: "2026-04-25", version: 2, type: "pdf" },
  { id: "dr4", title: "Dashboard Wireframes", project: "UrbanPulse Dashboard", client: "UrbanPulse Media", status: "changes-requested", reviewer: "Tom Bradley", submittedAt: "2026-04-25", dueDate: "2026-05-01", version: 2, type: "figma" },
  { id: "dr5", title: "Landing Page Design", project: "GreenLoop Website", client: "GreenLoop", status: "approved", reviewer: "Lena Fischer", submittedAt: "2026-04-22", dueDate: "2026-04-28", version: 4, type: "figma" },
  { id: "dr6", title: "CMS Layout Concepts", project: "UrbanPulse Content CMS", client: "UrbanPulse Media", status: "in-review", reviewer: "Tom Bradley", submittedAt: "2026-04-29", dueDate: "2026-05-03", version: 1, type: "image" },
  { id: "dr7", title: "Mobile Navigation Patterns", project: "Bloom Health Mobile App", client: "Bloom Health", status: "pending", reviewer: "Marcus Rivera", submittedAt: "2026-05-01", dueDate: "2026-05-07", version: 1, type: "figma" },
]

export const invoices: Invoice[] = [
  { id: "inv1", number: "INV-2026-001", client: "TechVault Inc.", project: "TechVault Platform Redesign", amount: 36000, status: "paid", issuedDate: "2026-03-01", dueDate: "2026-03-15", paidDate: "2026-03-12" },
  { id: "inv2", number: "INV-2026-002", client: "Bloom Health", project: "Bloom Health Mobile App", amount: 21250, status: "paid", issuedDate: "2026-03-15", dueDate: "2026-03-30", paidDate: "2026-03-28" },
  { id: "inv3", number: "INV-2026-003", client: "NovaCraft Studios", project: "NovaCraft Brand Identity", amount: 17500, status: "sent", issuedDate: "2026-04-15", dueDate: "2026-04-30", paidDate: null },
  { id: "inv4", number: "INV-2026-004", client: "UrbanPulse Media", project: "UrbanPulse Dashboard", amount: 28500, status: "overdue", issuedDate: "2026-04-01", dueDate: "2026-04-15", paidDate: null },
  { id: "inv5", number: "INV-2026-005", client: "TechVault Inc.", project: "TechVault Platform Redesign", amount: 36000, status: "sent", issuedDate: "2026-04-30", dueDate: "2026-05-15", paidDate: null },
  { id: "inv6", number: "INV-2026-006", client: "GreenLoop", project: "GreenLoop Website", amount: 14000, status: "draft", issuedDate: "2026-05-01", dueDate: "2026-05-15", paidDate: null },
  { id: "inv7", number: "INV-2026-007", client: "UrbanPulse Media", project: "UrbanPulse Content CMS", amount: 34000, status: "paid", issuedDate: "2026-03-20", dueDate: "2026-04-05", paidDate: "2026-04-03" },
  { id: "inv8", number: "INV-2026-008", client: "Bloom Health", project: "Bloom Health Admin Portal", amount: 42000, status: "paid", issuedDate: "2026-04-05", dueDate: "2026-04-20", paidDate: "2026-04-18" },
]

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
