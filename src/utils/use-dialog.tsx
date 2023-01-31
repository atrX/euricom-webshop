import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";
import {
  useDialogContext,
  type DialogInstance,
} from "../components/DialogProvider";

export function useDialog() {
  const context = useDialogContext();

  async function showDialog<TResult>(
    component: DialogInstance["component"],
    options?: Omit<DialogInstance, "component" | "resolve">
  ) {
    return new Promise((resolve) => {
      function close(result: TResult) {
        context?.setInstance(null);
        resolve(result);
      }

      const childrenWithProps = Children.map(component, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement, { close });
        }
        return child;
      });

      context?.setInstance({
        ...options,
        component: childrenWithProps,
      });
    });
  }

  function showConfirmation(
    message: string,
    options?: Omit<DialogInstance, "component" | "resolve">
  ) {
    return showDialog(<ConfirmationDialog>{message}</ConfirmationDialog>, {
      title: "Caution!",
      ...options,
    });
  }

  return {
    showDialog,
    showConfirmation,
  };
}
