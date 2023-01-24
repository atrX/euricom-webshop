import type { ReactNode } from "react";

export type GridProps = {
  children?: ReactNode;
};

const Grid: React.FC<GridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">{children}</div>
  );
};

export default Grid;
