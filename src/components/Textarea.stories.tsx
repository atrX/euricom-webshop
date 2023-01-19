import type { Meta } from "@storybook/react";
import { useState } from "react";
import Textarea from "./Textarea";

export default {
  component: Textarea,
} as Meta<typeof Textarea>;

export const Playground = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-wrap gap-1">
      <Textarea
        name="input"
        label="Textarea"
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
      <Textarea
        name="input"
        label="Disabled textarea"
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
      <Textarea
        name="input"
        label="Textarea"
        error="This is an error"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
