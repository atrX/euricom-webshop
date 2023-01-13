import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it } from "vitest";
import Table from "./Table";

function getTableData() {
  return Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: faker.name.fullName(),
    }));
}

describe("Table component", () => {
  let tableData: ReturnType<typeof getTableData>;

  function renderComponent() {
    render(
      <Table
        items={tableData}
        columns={[
          {
            key: "id",
            title: "ID",
          },
          {
            key: "name",
            title: "Name",
          },
        ]}
        primaryKey="id"
      />
    );
  }

  beforeEach(() => {
    tableData = getTableData();
  });

  it("should render", () => {
    renderComponent();
  });

  it("should show the correct columns", () => {
    renderComponent();

    screen.getByRole("columnheader", { name: /id/i });
    screen.getByRole("columnheader", { name: /name/i });
  });

  it("should show the correct data", () => {
    renderComponent();

    tableData.forEach((item) => {
      screen.getByRole("cell", { name: `${item.id}` });
      screen.getByRole("cell", { name: `${item.name}` });
    });
  });
});
