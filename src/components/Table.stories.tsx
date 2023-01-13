import type { Meta, StoryFn } from "@storybook/react";
import { faker } from "@faker-js/faker";
import Table from "./Table";

export default {
  component: Table,
} as Meta<typeof Table>;

function buildPeople() {
  return Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: faker.name.fullName(),
    }));
}

const Template: StoryFn<
  typeof Table<ReturnType<typeof buildPeople>[number]>
> = (args) => <Table {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  columns: [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
  ],
  items: buildPeople(),
  primaryKey: "id",
  zebra: false,
};

export const Zebra = Template.bind({});
Zebra.args = {
  ...Regular.args,
  zebra: true,
};
