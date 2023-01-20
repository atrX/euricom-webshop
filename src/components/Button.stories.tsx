import type { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

export default {
  component: Button,
} as Meta<typeof Button>;

export const Variants = () => (
  <div className="flex flex-wrap gap-1">
    <Button variant="primary" onClick={() => action("click")}>
      Primary button
    </Button>
    <Button variant="secondary" onClick={() => action("click")}>
      Secondary button
    </Button>
    <Button variant="accent" onClick={() => action("click")}>
      Accent button
    </Button>
    <Button variant="neutral" onClick={() => action("click")}>
      Neutral button
    </Button>
    <Button variant="ghost" onClick={() => action("click")}>
      Ghost button
    </Button>
    <Button variant="error" onClick={() => action("click")}>
      Error button
    </Button>
    <Button variant="info" onClick={() => action("click")}>
      Info button
    </Button>
    <Button variant="success" onClick={() => action("click")}>
      Success button
    </Button>
    <Button variant="warning" onClick={() => action("click")}>
      Warning button
    </Button>
    <Button variant="link" onClick={() => action("click")}>
      Link button
    </Button>
  </div>
);

export const Block = () => (
  <div className="flex flex-wrap gap-1">
    <Button block>Block button</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-wrap gap-1">
    <Button disabled>Disabled button</Button>
  </div>
);

export const Loading = () => (
  <div className="flex flex-wrap gap-1">
    <Button loading>Loading button</Button>
  </div>
);

export const Outline = () => (
  <div className="flex flex-wrap gap-1">
    <Button variant="primary" outline>
      Primary outline button
    </Button>
    <Button variant="secondary" outline>
      Secondary outline button
    </Button>
    <Button variant="accent" outline>
      Accent outline button
    </Button>
    <Button variant="neutral" outline>
      Neutral outline button
    </Button>
    <Button variant="ghost" outline>
      Ghost outline button
    </Button>
    <Button variant="error" outline>
      Error outline button
    </Button>
    <Button variant="info" outline>
      Info outline button
    </Button>
    <Button variant="success" outline>
      Success outline button
    </Button>
    <Button variant="warning" outline>
      Warning outline button
    </Button>
    <Button variant="link" outline>
      Link outline button
    </Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap gap-1">
    <Button size="xs">Extra small button</Button>
    <Button size="sm">Small button</Button>
    <Button size="md">Medium button</Button>
    <Button size="lg">Large button</Button>
  </div>
);
