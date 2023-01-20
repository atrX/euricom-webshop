export type ToastMessageObject = {
  dismissible?: boolean;
  message: string;
  timeout?: number;
  type?: "error" | "info" | "success" | "warning";
  uuid?: string;
};

export type ToastMessage = string | ToastMessageObject;
