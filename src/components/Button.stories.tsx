import type { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

export default {
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <Button onClick={() => action("click")} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  block: false,
  children: "Primary button",
  disabled: false,
  loading: false,
  outline: false,
  size: "md",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  variant: "secondary",
};
