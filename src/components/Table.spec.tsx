import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
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
  function renderComponent() {
    render(
      <Table
        items={getTableData()}
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

  it("should render", () => {
    renderComponent();
  });

  it("should show the correct columns", () => {
    renderComponent();

    screen.getByRole("columnheader", { name: /id/i });
    screen.getByRole("columnheader", { name: /name/i });
  });

  it("should show the correct data", () => {
    const tableData = getTableData();

    renderComponent();

    tableData.forEach((item) => {
      screen.getByRole("cell", { name: `${item.id}` });
      screen.getByRole("cell", { name: `${item.name}` });
    });
  });
});
