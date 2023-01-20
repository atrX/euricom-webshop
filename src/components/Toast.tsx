import classNames from "classnames";
import { MdClose } from "react-icons/md";
import type { ToastMessageObject } from "../types/toast";
import Button from "./Button";

export type ToastProps = {
  message: string;
  onDismiss?: () => void;
  type?: ToastMessageObject["type"];
};

const Toast: React.FC<ToastProps> = ({
  message,
  onDismiss,
  type = "error",
}) => {
  if (!message) return null;

  return (
    <div
      className={classNames("alert w-max", {
        "alert-error": type === "error",
        "alert-info": type === "info",
        "alert-success": type === "success",
        "alert-warning": type === "warning",
      })}
    >
      <div>
        <span>{message}</span>
        {onDismiss && (
          <Button variant="ghost" size="xs" onClick={onDismiss}>
            <MdClose />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toast;
