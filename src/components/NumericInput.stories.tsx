import type { Meta } from "@storybook/react";
import { useState } from "react";
import NumericInput from "./NumericInput";

export default {
  component: NumericInput,
} as Meta<typeof NumericInput>;

export const Playground = () => {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap gap-1">
      <NumericInput
        name="input"
        label="Numeric input"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap gap-1">
      <NumericInput
        name="input"
        label="Disabled numeric input"
        disabled
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export const Error = () => {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap gap-1">
      <NumericInput
        name="input"
        label="Numeric input"
        error="This is an error"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
