import type { ReactNode } from "react";

export type DialogProps = {
  children?: ReactNode;
  title?: string;
};

const Dialog: React.FC<DialogProps> = ({ children, title }) => (
  <div className="modal modal-open">
    <div className="modal-box">
      {title && <h3 className="text-lg font-bold">{title}</h3>}
      <div>{children}</div>
    </div>
  </div>
);

export default Dialog;
