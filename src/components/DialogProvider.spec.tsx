import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { render, screen } from "../../tests/test-utils";
import { useDialog } from "../utils/use-dialog";
import Button from "./Button";

describe("DialogProvider component", () => {
  let hook: ReturnType<typeof useDialog>;

  const HookWrapper: React.FC = () => {
    hook = useDialog();
    return <></>;
  };

  function renderDialogProvider() {
    render(<HookWrapper />);
  }

  describe("showDialog", () => {
    it("should show a dialog when invoked", async () => {
      const TestComponent: React.FC = () => {
        return <div>Hello world!</div>;
      };

      renderDialogProvider();

      void hook.showDialog(<TestComponent />, { title: "My title" });

      await screen.findByRole("heading", { name: /my title/i });
      screen.getByText("Hello world!");
    });

    it("should dismiss the dialog when close is called and return a value", async () => {
      const TestComponent: React.FC<{
        close?: (result: boolean) => void;
      }> = ({ close }) => {
        return <Button onClick={() => close?.(true)}>Close</Button>;
      };

      renderDialogProvider();

      const result = hook.showDialog(<TestComponent />);
      const closeButton = await screen.findByRole("button", { name: /close/i });
      await userEvent.click(closeButton);
      expect(await result).toBe(true);
    });
  });

  describe("showConfirmation", () => {
    it("should show a confirmation dialog when invoked", async () => {
      renderDialogProvider();

      void hook.showConfirmation("Hello world!", { title: "My title" });

      await screen.findByRole("heading", { name: /my title/i });
      screen.getByRole("button", { name: /yes/i });
      screen.getByRole("button", { name: /no/i });
    });

    it("should dismiss the dialog when No is clicked and return false", async () => {
      renderDialogProvider();

      const result = hook.showConfirmation("Hello world!");
      const noButton = await screen.findByRole("button", { name: /no/i });
      await userEvent.click(noButton);
      expect(await result).toBeFalsy();
    });

    it("should dismiss the dialog when Yes is clicked and return true", async () => {
      renderDialogProvider();

      const result = hook.showConfirmation("Hello world!");
      const yesButton = await screen.findByRole("button", { name: /yes/i });
      await userEvent.click(yesButton);
      expect(await result).toBeTruthy();
    });
  });
});
