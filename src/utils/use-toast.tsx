import { v4 as uuid } from "uuid";
import { useToastContext } from "../components/ToastProvider";
import type { ToastMessage, ToastMessageObject } from "../types/toast";

export function useToast() {
  const { setToasts } = useToastContext();

  function showToast(toast: ToastMessage) {
    const toastObject: ToastMessageObject =
      typeof toast === "string" ? { message: toast } : toast;
    setToasts((toasts) => [...toasts, { ...toastObject, uuid: uuid() }]);
  }

  return {
    showToast,
  };
}
