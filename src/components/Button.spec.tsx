import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ButtonProps } from "./Button";
import Button from "./Button";

describe("Button component", () => {
  it("should render", () => {
    render(<Button />);
  });

  it("should render children", () => {
    const text = "Hello world!";
    render(<Button>{text}</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(text);
  });

  it("should handle click", async () => {
    const clickHandler = vi.fn();
    render(<Button onClick={clickHandler} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(clickHandler).toHaveBeenCalled();
  });

  describe("when block prop is set", () => {
    it("should have the correct class", () => {
      render(<Button block />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn-block");
    });
  });

  describe("when disabled prop is set", () => {
    it("should disable the button", () => {
      render(<Button disabled />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should not call click handler", async () => {
      const clickHandler = vi.fn();
      render(<Button disabled onClick={clickHandler} />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  describe("when loading prop is set", () => {
    it("should have the correct class", () => {
      render(<Button loading />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("loading");
    });
  });

  describe("when outline prop is set", () => {
    it("should have the correct class", () => {
      render(<Button outline />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("btn-outline");
    });
  });

  describe("when size prop is set", () => {
    it.each(["xs", "sm", "md", "lg"] as Array<
      NonNullable<ButtonProps["size"]>
    >)('it should have correct class for size "%s"', (size) => {
      render(<Button size={size} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(`btn-${size}`);
    });
  });

  describe("when variant prop is set", () => {
    it.each([
      "primary",
      "secondary",
      "accent",
      // "neutral",
      "ghost",
      "error",
      "info",
      "link",
      "success",
      "warning",
    ] as Array<NonNullable<ButtonProps["variant"]>>)(
      'it should have correct class for variant "%s"',
      (variant) => {
        render(<Button variant={variant} />);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`btn-${variant}`);
      }
    );
  });
});
