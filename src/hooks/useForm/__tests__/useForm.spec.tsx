import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useForm } from "@hooks/useForm";
import { act } from "react-dom/test-utils";
import React from "react";

describe("useForm hook", () => {
  const initial = {
    name: "Test",
    age: 10,
  };

  const validation = {
    name: vi.fn().mockImplementation((value: string) => {
      if (value.length < 2) {
        return {
          error: true,
          errorMessage: "Name length should be more than 2 symbols",
        };
      }

      if (value.length > 6) {
        return {
          error: true,
          errorMessage: "Name length should be less than 6 symbols",
        };
      }

      return { error: false };
    }),
    age: vi.fn().mockImplementation((value: number) => {
      if (value >= 18) {
        return { error: false };
      }

      return { error: true, errorMessage: "Age should be more than 18" };
    }),
  };

  const onSubmitMock = vi.fn();

  function setup(props: Partial<FormParams<typeof initial>> = {}) {
    return renderHook(() =>
      useForm({ initial, validation, onSubmit: onSubmitMock, ...props })
    );
  }

  it("should generate fields", () => {
    const { result } = setup();

    expect(result.current.fields.age).toBeDefined();
    expect(result.current.fields.name).toBeDefined();
  });

  it("should run validation on mount", () => {
    const { result } = setup({ options: { validateOnMount: true } });

    expect(result.current.fields.age.error).toBeTruthy();
    expect(result.current.fields.name.error).toBeFalsy();
    expect(result.current.isValid).toBeFalsy();
  });

  it("should run validation on change", () => {
    const { result } = setup({ options: { validateOnChange: true } });

    const event = {
      target: { name: "name", value: "" },
    };

    expect(result.current.fields.name.error).toBeFalsy();

    act(() => {
      result.current.handleChange(event as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.fields.name.error).toBeTruthy();
  });

  it("should run validation on blur", () => {
    const { result } = setup({
      initial: { ...initial, name: "" },
      options: { validateOnBlur: true },
    });

    const event = {
      target: { name: "name" },
    };

    expect(result.current.fields.name.error).toBeFalsy();

    act(() => {
      result.current.handleBlur(event as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.fields.name.error).toBeTruthy();
  });

  it("should update field value", () => {
    const { result } = setup();

    act(() => {
      result.current.setFieldValue("name", "Te");
    });

    expect(result.current.fields.name.value).toBe("Te");
  });

  it("should update field touched", () => {
    const { result } = setup();

    act(() => {
      result.current.setFieldTouched("name", true);
    });

    expect(result.current.fields.name.touched).toBeTruthy();
  });

  it("should update field error", () => {
    const { result } = setup();

    act(() => {
      result.current.setFieldError("name", "Error");
    });

    expect(result.current.fields.name.error).toBeTruthy();
    expect(result.current.fields.name.errorMessage).toBe("Error");
  });

  it("should reset form state", () => {
    const { result } = setup();

    act(() => {
      result.current.setFieldValue("name", "Vladyslav");
      result.current.setFieldValue("age", 25);
    });

    expect(result.current.fields.name.value).toBe("Vladyslav");
    expect(result.current.fields.age.value).toBe(25);

    act(() => {
      result.current.reset();
    });

    expect(result.current.fields.name.value).toBe(initial.name);
    expect(result.current.fields.age.value).toBe(initial.age);
  });

  it("should not run onSubmit", () => {
    const { result } = setup({ initial: { age: 5, name: "" } });

    act(() => {
      const event = {
        preventDefault: vi.fn(),
      };

      result.current.handleSubmit(event as unknown as React.FormEvent<Element>);
    });

    expect(result.current.fields.age.error).toBeTruthy();
    expect(result.current.fields.name.error).toBeTruthy();
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should trigger onSubmit", () => {
    const { result } = setup({ initial: { age: 20, name: "Test" } });

    act(() => {
      const event = {
        preventDefault: vi.fn(),
      };

      result.current.handleSubmit(event as unknown as React.FormEvent<Element>);
    });

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: "Test",
      age: 20,
    });
  });
});
