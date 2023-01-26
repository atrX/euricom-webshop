import type { Meta } from "@storybook/react";
import { faker } from "@faker-js/faker";
import Table from "./Table";
import page from "./Table.mdx";
import { useState } from "react";
import orderBy from "lodash/orderBy";

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
  sortable?: boolean;
};

function buildPeople(): Item[] {
  return Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: faker.name.fullName(),
    }));
}

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
  ] as Column<Item>[];
  const items = buildPeople();
  return <Table columns={columns} items={items} primaryKey="id" />;
};

export const Zebra = () => {
  const columns = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
  ] as Column<Item>[];
  const items = buildPeople();
  return <Table columns={columns} items={items} primaryKey="id" zebra />;
};

export const CustomBody = () => {
  const columns = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
  ] as Column<Item>[];
  const items = buildPeople();
  return (
    <Table columns={columns} items={items} primaryKey="id">
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
        </tr>
      ))}
    </Table>
  );
};

export const Sortable = () => {
  const columns = [
    {
      key: "id",
      title: "ID",
      sortable: true,
    },
    {
      key: "name",
      title: "Name",
      sortable: true,
    },
  ] as Column<Item>[];
  const items = buildPeople();

  const [sortState, setSortState] = useState<{
    sortBy: keyof Item;
    sortOrder: "asc" | "desc";
  }>({
    sortBy: "id",
    sortOrder: "asc",
  });
  const sortedItems = orderBy(items, [sortState.sortBy], [sortState.sortOrder]);

  return (
    <Table
      columns={columns}
      items={sortedItems}
      primaryKey="id"
      sortBy={sortState.sortBy}
      sortOrder={sortState.sortOrder}
      onSort={(sortBy, sortOrder) => setSortState({ sortBy, sortOrder })}
    />
  );
};
