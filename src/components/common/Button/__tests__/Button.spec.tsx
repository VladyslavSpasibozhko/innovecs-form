import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@components/common";

describe("Button.tsx", () => {
  it("component should be rendered", () => {
    render(<Button>Test</Button>);
    const btn = screen.getByText("Test");
    expect(btn).toBeInTheDocument();
  });
});
