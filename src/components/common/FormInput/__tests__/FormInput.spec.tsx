import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { FormInput, FormInputProps } from "@components/common";

describe("FormInput.tsx", () => {
  const onChangeMock = vi.fn();
  const onBlurMock = vi.fn();

  function setup(props: Partial<FormInputProps> = {}) {
    return render(<FormInput type="text" {...props} />);
  }

  it("component should be rendered", () => {
    setup();
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("onChange should be triggered", async () => {
    setup({ onChange: onChangeMock });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hello");

    expect(onChangeMock).toHaveBeenCalled();
  });

  it("onBlur should be triggered", async () => {
    const { container } = setup({ onBlur: onBlurMock });
    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.click(container);

    expect(onBlurMock).toHaveBeenCalled();
  });

  it("should show an error", async () => {
    setup({ touched: true, error: true, errorMessage: "Error" });
    const error = screen.getByText("Error");
    expect(error).toBeInTheDocument();
  });

  it("should not show an error", async () => {
    setup({ error: true, errorMessage: "Error" });
    const error = screen.queryByText("Error");
    expect(error).not.toBeInTheDocument();
  });

  it("icon should be rendered", () => {
    setup({ type: "password" });

    const viewIcon = screen.getByTestId("view-icon");
    expect(viewIcon).toBeInTheDocument();
  });

  it("input type should be changed", async () => {
    setup({ type: "password" });

    const viewIcon = screen.getByTestId("view-icon");
    await userEvent.click(viewIcon);

    const viewOffIcon = screen.getByTestId("view-off-icon");
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "text");
    expect(viewOffIcon).toBeInTheDocument();
  });

  it("should render label", () => {
    setup({ label: "Label" });

    const label = screen.getByText("Label");
    expect(label).toBeInTheDocument();
  });
});
