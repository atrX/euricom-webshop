import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { render } from "../../tests/test-utils";
import TextInput, { type TextInputProps } from "./TextInput";

const TestComponent: React.FC<Omit<TextInputProps, "value" | "onChange">> = (
  props
) => {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={setValue} {...props} />;
};

describe("TextInput component", () => {
  it("should render", () => {
    render(<TestComponent />);
  });

  it("should update the value when typing", async () => {
    const value = "Hello world!";
    render(<TestComponent />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, value);

    expect(input).toHaveValue(value);
  });

  describe("when the name prop is set", () => {
    it("should apply a name to the native input", () => {
      const name = "myInput";
      render(<TestComponent name={name} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("name", name);
    });
  });

  describe("when the disabled prop is set", () => {
    it("should disable the text input", () => {
      render(<TestComponent disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });
  });

  describe("when the label prop is set", () => {
    it("should display a label", () => {
      const labelText = "Hello world!";
      render(<TestComponent label={labelText} />);
      screen.getByText(labelText);
    });
  });

  describe("when the error prop is set", () => {
    it("should display a validation error", () => {
      const errorText = "This is an error.";
      render(<TestComponent error={errorText} />);
      screen.getByRole("alert", { name: errorText });
    });
  });
});
