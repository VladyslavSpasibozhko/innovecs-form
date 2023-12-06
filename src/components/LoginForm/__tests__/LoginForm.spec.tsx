import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { LoginForm } from "@components/LoginForm";
import { Chakra } from "@libs/chakra";

describe("LoginForm.tsx", () => {
  it("component should be rendered", () => {
    render(<LoginForm />);
    const form = screen.getByText("Sign In");
    expect(form).toBeInTheDocument();
  });

  it("form should be submitted", async () => {
    render(
      <Chakra>
        <LoginForm />
      </Chakra>
    );

    const button = screen.getByText("Log in");

    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");

    await userEvent.type(email, "test@ukr.net");
    await userEvent.type(password, "123456789");

    await userEvent.click(button);

    const toast = screen.getByText("You are successfully logged in");

    expect(toast).toBeInTheDocument();
  });
});
