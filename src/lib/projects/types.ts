export type ProjectStatus = "active" | "on_hold" | "completed";

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  /** Budget in minor units (USD cents) */
  budgetCents: number;
  /** Actual spend in minor units (USD cents) */
  actualSpendCents: number;
}
