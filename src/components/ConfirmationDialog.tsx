import type { ReactNode } from "react";
import Button from "./Button";
import DialogActions from "./DialogActions";

export type ConfirmationDialogProps = {
  children?: ReactNode;
  close?: (result: boolean) => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  children,
  close,
}) => (
  <>
    {children}
    <DialogActions>
      <Button variant="error" onClick={() => close?.(true)}>
        Yes
      </Button>
      <Button variant="neutral" outline onClick={() => close?.(false)}>
        No
      </Button>
    </DialogActions>
  </>
);

export default ConfirmationDialog;
