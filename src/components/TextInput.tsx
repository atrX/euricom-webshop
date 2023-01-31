import classNames from "classnames";
import { type ChangeEvent, forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import InputError from "./InputError";

export type TextInputProps = {
  disabled?: boolean;
  error?: FieldError | string;
  label?: string;
  name?: string;
  onChange: (value: string) => void;
  type?: "email" | "password" | "text";
  value: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    disabled,
    error,
    label,
    name,
    onChange,
    type = "text",
    value,
  } = props;

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        className={classNames(
          "input",
          "input-bordered",
          error && "input-error"
        )}
        ref={ref}
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        value={value}
        onChange={changeHandler}
      />
      {error && <InputError value={error} />}
    </div>
  );
});
TextInput.displayName = "TextInput";

export default TextInput;
