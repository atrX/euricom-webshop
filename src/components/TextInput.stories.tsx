import type { Meta } from "@storybook/react";
import { useState } from "react";
import TextInput from "./TextInput";

export default {
  component: TextInput,
} as Meta<typeof TextInput>;

export const Playground = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-wrap gap-1">
      <TextInput
        name="input"
        label="Text input"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-wrap gap-1">
      <TextInput
        name="input"
        label="Disabled text input"
        disabled
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export const Error = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-wrap gap-1">
      <TextInput
        name="input"
        label="Text input"
        error="This is an error"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
