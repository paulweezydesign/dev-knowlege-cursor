export type LeadStage =
  | "new"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export type ProjectStatus =
  | "discovery"
  | "design"
  | "build"
  | "uat"
  | "launched"
  | "paused";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type ApprovalStatus = "pending" | "approved" | "changes_requested";

export type TaskStatus = "backlog" | "in_progress" | "in_review" | "done";

export type Priority = "low" | "medium" | "high";

export type AgencyRole =
  | "owner"
  | "pm"
  | "designer"
  | "engineer"
  | "qa"
  | "finance";

export interface Person {
  id: string;
  name: string;
  email: string;
  role: AgencyRole | "client";
  avatarColor: string;
  utilization?: number;
  capacity?: number;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  primaryContact: string;
  email: string;
  stage: LeadStage;
  arr: number;
  health: "green" | "yellow" | "red";
  lastTouch: string;
  logoColor: string;
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  amount: number;
  paid: boolean;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: string;
  priority: Priority;
  estimateHours: number;
  loggedHours: number;
}

export interface DesignReviewComment {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  pinX?: number;
  pinY?: number;
}

export interface DesignReview {
  id: string;
  projectId: string;
  title: string;
  thumbnail: string;
  status: ApprovalStatus;
  version: number;
  reviewers: string[];
  dueDate: string;
  comments: DesignReviewComment[];
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: ProjectStatus;
  startDate: string;
  targetDate: string;
  progress: number;
  budget: number;
  spent: number;
  margin: number;
  team: string[];
  pm: string;
  milestones: Milestone[];
  tasks: Task[];
  scopeCreepPct: number;
  onTime: boolean;
  description: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  projectId: string;
  milestoneId?: string;
  amount: number;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
}
