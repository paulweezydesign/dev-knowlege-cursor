import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("AgencyOS dashboard", () => {
  it("renders the primary operator sections and seeded agency content", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "AgencyOS command center" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Review approvals" })
    ).toHaveAttribute("href", "#priorities");
    expect(
      screen.getByRole("link", { name: "Open workspace map" })
    ).toHaveAttribute("href", "#pipeline");
    expect(screen.getByText("Open approvals")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("Today's priorities")).toBeInTheDocument();
    expect(screen.getByText("Pipeline at a glance")).toBeInTheDocument();
    expect(screen.getByText("Nexa Health")).toBeInTheDocument();
    expect(screen.getByText("Delivery radar")).toBeInTheDocument();
    expect(screen.getByText("Automation health")).toBeInTheDocument();
  });
});
