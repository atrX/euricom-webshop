import type { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

export default {
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <Button onClick={() => action("click")} {...args} />
);

export const Variants = () => (
  <div className="flex flex-wrap gap-1">
    <Button variant="primary">Primary button</Button>
    <Button variant="secondary">Secondary button</Button>
    <Button variant="accent">Accent button</Button>
    <Button variant="error">Error button</Button>
    <Button variant="info">Info button</Button>
    <Button variant="success">Success button</Button>
    <Button variant="warning">Warning button</Button>
    <Button variant="link">Link button</Button>
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
