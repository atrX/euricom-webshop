import { forwardRef, useEffect, useState } from "react";
import type { FieldError } from "react-hook-form";
import TextInput from "./TextInput";

export type NumericInputProps = {
  disabled?: boolean;
  error?: FieldError | string;
  label?: string;
  name?: string;
  onChange: (value: number | null) => void;
  value: number | null;
};

function numberToString(value?: number | null) {
  return value ? `${value}` : "";
}

const NumericInput: React.FC<NumericInputProps> = forwardRef<
  HTMLInputElement,
  NumericInputProps
>(({ value, onChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState(numberToString(value));

  useEffect(() => {
    if (value !== Number(internalValue)) {
      setInternalValue(numberToString(value));
    }
  }, [internalValue, value]);

  function handleChange(stringValue: string) {
    const numericValue = stringValue ? Number(stringValue) : null;
    if (numericValue !== null && isNaN(numericValue)) return;
    setInternalValue(stringValue);
    onChange(numericValue);
  }

  return (
    <TextInput
      ref={ref}
      {...props}
      value={internalValue}
      onChange={handleChange}
    />
  );
});
NumericInput.displayName = "NumericInput";

export default NumericInput;
