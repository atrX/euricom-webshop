import type { ReactNode } from "react";
import classNames from "classnames";

const SIZES = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

const VARIANTS = {
  accent: "btn-accent",
  error: "btn-error",
  ghost: "btn-ghost",
  info: "btn-info",
  link: "btn-link",
  neutral: "",
  primary: "btn-primary",
  secondary: "btn-secondary",
  success: "btn-success",
  warning: "btn-warning",
};

export type ButtonProps = {
  block?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  outline?: boolean;
  size?: keyof typeof SIZES;
  type?: "button" | "reset" | "submit";
  variant?: keyof typeof VARIANTS;
};

const Button: React.FC<ButtonProps> = ({
  block,
  children,
  disabled,
  loading,
  onClick,
  outline,
  size = "md",
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      className={classNames(
        "btn",
        SIZES[size],
        VARIANTS[variant],
        block && "btn-block",
        loading && "loading",
        outline && "btn-outline"
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
