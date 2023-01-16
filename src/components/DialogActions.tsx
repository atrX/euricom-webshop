import type { ReactNode } from "react";

export type DialogActionsProps = {
  children?: ReactNode;
};

const DialogActions: React.FC<DialogActionsProps> = ({ children }) => (
  <div className="modal-action">{children}</div>
);

export default DialogActions;
