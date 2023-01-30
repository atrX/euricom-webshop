import type { FieldError } from "react-hook-form";

export type InputErrorProps = {
  value?: FieldError | string;
};

const InputError: React.FC<InputErrorProps> = ({ value }) => {
  const message = typeof value === "string" ? value : value?.message;
  return (
    <div className="label">
      <span
        className="label-text-alt text-error"
        role="alert"
        aria-label={message}
      >
        {message}
      </span>
    </div>
  );
};

export default InputError;
