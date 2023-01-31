import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { render } from "../../tests/test-utils";
import { useToast } from "../utils/use-toast";
import { ToastMessageObject } from "../types/toast";

describe("ToastProvider component", () => {
  let hook: ReturnType<typeof useToast>;

  const HookWrapper: React.FC = () => {
    hook = useToast();
    return <></>;
  };

  function renderToastProvider() {
    render(<HookWrapper />);
  }

  it("should show a toast when invoked", async () => {
    const message = "Hello world!";
    renderToastProvider();

    void hook.showToast(message);

    await screen.findByText(message);
  });

  it.each(["error", "info", "success", "warning"] as Array<
    NonNullable<ToastMessageObject["type"]>
  >)("should show the correct toast for type %s", async (type) => {
    const message = "Hello world!";
    renderToastProvider();

    void hook.showToast({ message, type });

    const toast = await screen.findByRole("alert", { name: message });
    expect(toast).toHaveClass(`alert-${type}`);
  });
});
