import classNames from "classnames";
import { type ChangeEvent, forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import InputError from "./InputError";

export type TextareaProps = {
  disabled?: boolean;
  error?: FieldError | string;
  label?: string;
  name?: string;
  onChange: (value: string) => void;
  value: string;
};

const Textarea: React.FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  const { disabled, error, label, name, onChange, value } = props;

  function changeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        className={classNames(
          "textarea",
          "textarea-bordered",
          error && "textarea-error"
        )}
        ref={ref}
        id={name}
        name={name}
        disabled={disabled}
        value={value}
        onChange={changeHandler}
      />
      {error && <InputError value={error} />}
    </div>
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
