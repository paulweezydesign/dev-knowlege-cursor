import type { Project } from "./types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-brand-refresh",
    name: "Brand refresh & site",
    client: "Northwind Studio",
    status: "active",
    budgetCents: 120_000_00,
    actualSpendCents: 92_400_00,
  },
  {
    id: "proj-mobile-app",
    name: "Mobile app MVP",
    client: "Contoso Labs",
    status: "active",
    budgetCents: 280_000_00,
    actualSpendCents: 224_000_00,
  },
  {
    id: "proj-marketing-site",
    name: "Marketing site rebuild",
    client: "Fabrikam Inc.",
    status: "on_hold",
    budgetCents: 45_000_00,
    actualSpendCents: 58_500_00,
  },
  {
    id: "proj-design-system",
    name: "Design system rollout",
    client: "Northwind Studio",
    status: "completed",
    budgetCents: 75_000_00,
    actualSpendCents: 71_250_00,
  },
];

export function getProjectById(id: string): Project | undefined {
  return MOCK_PROJECTS.find((p) => p.id === id);
}
