import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("AgencyOS dashboard", () => {
  it("renders the primary operator sections for the dashboard shell", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "AgencyOS command center" })
    ).toBeInTheDocument();
    expect(screen.getByText("Today's priorities")).toBeInTheDocument();
    expect(screen.getByText("Pipeline at a glance")).toBeInTheDocument();
    expect(screen.getByText("Delivery radar")).toBeInTheDocument();
    expect(screen.getByText("Automation health")).toBeInTheDocument();
  });
});
