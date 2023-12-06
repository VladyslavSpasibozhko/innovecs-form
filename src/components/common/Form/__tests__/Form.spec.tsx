import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Form, FormProps } from "@components/common";

describe("Form.tsx", () => {
  const onSubmitMock = vi.fn().mockImplementation((e: React.FormEvent) => {
    e.preventDefault();
  });

  function setup(props: Partial<FormProps> = {}) {
    return render(
      <Form data-testid="form" onSubmit={onSubmitMock} {...props}>
        <button type="submit">Submit</button>
      </Form>
    );
  }

  it("component should be rendered", () => {
    setup();
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });

  it("should render children", () => {
    setup();

    const btn = screen.getByText("Submit");
    expect(btn).toBeInTheDocument();
  });

  it("should render title", () => {
    setup({ title: "Form" });

    const title = screen.getByText("Form");
    expect(title).toBeInTheDocument();
  });

  it("onSubmit should be triggered", async () => {
    setup();

    const btn = screen.getByText("Submit");
    await userEvent.click(btn);
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
