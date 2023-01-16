import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  function renderComponent(initialPage = 1) {
    const PaginationComponent: React.FC = () => {
      const [page, setPage] = useState(initialPage);
      return <Pagination page={page} totalPages={10} onGoToPage={setPage} />;
    };

    render(<PaginationComponent />);
  }

  it("should render", () => {
    renderComponent();
  });

  it.each([
    [1, [1, 2, 3]],
    [2, [1, 2, 3, 4]],
    [3, [1, 2, 3, 4, 5]],
    [4, [2, 3, 4, 5, 6]],
    [8, [6, 7, 8, 9, 10]],
    [9, [7, 8, 9, 10]],
    [10, [8, 9, 10]],
  ])(
    "should display the correct pages for page %i: %j",
    (page, visiblePages) => {
      renderComponent(page);

      visiblePages.forEach((visiblePage) => {
        screen.getByText(visiblePage);
      });
      expect(false).toBeTruthy();
    }
  );
});
