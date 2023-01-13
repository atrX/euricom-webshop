import type { Meta, StoryFn } from "@storybook/react";
import { faker } from "@faker-js/faker";
import Table from "./Table";
import page from "./Table.mdx";

export default {
  component: Table,
  parameters: {
    docs: {
       page,
    },
  },
} as Meta<typeof Table>;

type Item = {
  id: number;
  name: string;
};

type Column<T> = {
  title: string;
  key: keyof T;
};

function buildPeople(): Item[] {
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

export const Simple = () => {
  const columns = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
  ] as Column<Item>[]
  const items = buildPeople();
  return <Table columns={columns} items={items} primaryKey="id"/>
}
