import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { render } from "../../tests/test-utils";
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

  it("should show a dialog when invoked", async () => {
    const TestComponent: React.FC = () => {
      return <div>Hello world!</div>;
    };

    renderDialogProvider();

    void hook.showDialog(<TestComponent />);

    await screen.findByText("Hello world!");
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
