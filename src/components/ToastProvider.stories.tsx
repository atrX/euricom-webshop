import type { Meta } from "@storybook/react";
import { useToast } from "../utils/use-toast";
import Button from "./Button";
import ToastProvider from "./ToastProvider";

export default {
  component: ToastProvider,
} as Meta<typeof ToastProvider>;

export const Playground = () => {
  const ToastButtons: React.FC = () => {
    const { showToast } = useToast();

    return (
      <>
        <Button
          onClick={() =>
            showToast({
              message: "This is an error toast",
              type: "error",
            })
          }
        >
          Show error toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              message: "This is an info toast",
              type: "info",
            })
          }
        >
          Show info toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              message: "This is a success toast",
              type: "success",
            })
          }
        >
          Show success toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              message: "This is a warning toast",
              type: "warning",
            })
          }
        >
          Show warning toast
        </Button>
      </>
    );
  };

  return (
    <div className="flex flex-wrap gap-1">
      <ToastProvider>
        <ToastButtons />
      </ToastProvider>
    </div>
  );
};
