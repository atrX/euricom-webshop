import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  type SetStateAction,
  type Dispatch,
  useEffect,
  useCallback,
} from "react";
import type { ToastMessageObject } from "../types/toast";
import Toast from "./Toast";

export const ToastContext = createContext<{
  toasts: Array<ToastMessageObject>;
  setToasts: Dispatch<SetStateAction<Array<ToastMessageObject>>>;
} | null>(null);

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToastContext must be used inside a ToastProvider");
  return context;
}

const ToastConsumer: React.FC = () => {
  const { toasts, setToasts } = useToastContext();
  const [toastCount, setToastCount] = useState(0);
  const [timeouts, setTimeouts] = useState<Array<NodeJS.Timeout>>([]);

  const dismissToast = useCallback(
    (toastIndex: number) => {
      setToasts((toasts) => toasts.filter((_, index) => index !== toastIndex));
      clearTimeout(timeouts[toastIndex]);
      setTimeouts((timeouts) =>
        timeouts.filter((_, index) => index !== toastIndex)
      );
    },
    [setToasts, timeouts]
  );

  useEffect(() => {
    // if a new toast was added, prepare to clean it up
    if (toasts.length > toastCount) {
      const [toast] = toasts.slice(-1);
      const time = toast?.timeout ?? 5000;
      const timeout = setTimeout(() => dismissToast(0), time);
      setTimeouts((timeouts) => [...timeouts, timeout]);
    }

    if (toasts.length !== toastCount) {
      setToastCount(toasts.length);
    }
  }, [toasts, setToasts, toastCount, setToastCount, dismissToast]);

  useEffect(() => {
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
    // we only want to clean up all the timers when the component unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="toast-end toast toast-top z-50 items-end">
      {toasts.map((toast, index) => {
        const onDismiss =
          toast.dismissible !== false ? () => dismissToast(index) : undefined;

        return (
          <Toast
            key={toast.uuid}
            message={toast.message}
            type={toast.type}
            onDismiss={onDismiss}
          />
        );
      })}
    </div>
  );
};

const ToastProvider: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastMessageObject>>([]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        setToasts,
      }}
    >
      <ToastConsumer />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
