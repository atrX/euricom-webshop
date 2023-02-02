import { render, screen } from "../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

type PaginationComponentProps = {
  initialPage?: number;
  onGoToPage?: (page: number) => void;
};

describe("Pagination component", () => {
  function renderComponent({
    initialPage = 1,
    onGoToPage,
  }: PaginationComponentProps = {}) {
    const PaginationComponent: React.FC = () => {
      const [page, setPage] = useState(initialPage);
      return (
        <Pagination
          page={page}
          totalPages={10}
          onGoToPage={onGoToPage ?? setPage}
        />
      );
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
    (initialPage, visiblePages) => {
      renderComponent({ initialPage });

      visiblePages.forEach((visiblePage) => {
        screen.getByText(visiblePage);
      });
    }
  );

  it("should go to the correct page when clicked", async () => {
    const goToPageMock = vi.fn();

    renderComponent({ onGoToPage: goToPageMock });

    const pageButton = screen.getByRole("button", { name: "3" });
    await userEvent.click(pageButton);

    expect(goToPageMock).toHaveBeenCalledWith(3);
  });
});
