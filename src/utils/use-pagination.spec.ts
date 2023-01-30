import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PaginationOptions } from "../types/pagination";
import { usePagination } from "./use-pagination";

describe("usePagination", () => {
  it("should return a pagination object with defaults", () => {
    const { result } = renderHook(usePagination);

    expect(result.current).toHaveProperty("pagination");
    expect(result.current.pagination).toStrictEqual(
      expect.objectContaining({
        order: "asc",
        page: 1,
        rowsPerPage: 20,
        orderBy: undefined,
        totalRows: 0,
        totalPages: 0,
      })
    );
  });

  it("should return a pagination object with values based on props", () => {
    const pagination: PaginationOptions = {
      order: "desc",
      page: 2,
      orderBy: "name",
      rowsPerPage: 10,
    };

    const { result } = renderHook(usePagination, {
      initialProps: pagination,
    });

    expect(result.current).toHaveProperty("pagination");
    expect(result.current.pagination).toStrictEqual(
      expect.objectContaining(pagination)
    );
  });

  it("should return a setter for the pagination object", () => {
    const pagination: PaginationOptions = {
      order: "desc",
      page: 2,
      orderBy: "name",
      rowsPerPage: 10,
    };

    const { result } = renderHook(usePagination);

    expect(result.current).toHaveProperty(
      "setPagination",
      expect.any(Function)
    );

    act(() => {
      result.current.setPagination((previousPagination) => ({
        ...previousPagination,
        ...pagination,
      }));
    });

    expect(result.current.pagination).toStrictEqual(
      expect.objectContaining(pagination)
    );
  });

  describe("goToNextPage", () => {
    it("should increment the page prop", () => {
      const { result } = renderHook(usePagination, {
        initialProps: {
          totalPages: 10,
        },
      });

      expect(result.current.pagination).toHaveProperty("page", 1);
      act(() => result.current.goToNextPage());
      expect(result.current.pagination).toHaveProperty("page", 2);
    });

    it("should not increment past the total page count", () => {
      const { result } = renderHook(usePagination, {
        initialProps: {
          page: 2,
          totalPages: 2,
        },
      });

      expect(result.current.pagination).toHaveProperty("page", 2);
      act(() => result.current.goToNextPage());
      expect(result.current.pagination).toHaveProperty("page", 2);
    });
  });

  describe("goToPreviousPage", () => {
    it("should decrement the page prop", () => {
      const { result } = renderHook(usePagination, {
        initialProps: {
          page: 2,
          totalPages: 10,
        },
      });

      expect(result.current.pagination).toHaveProperty("page", 2);
      act(() => result.current.goToPreviousPage());
      expect(result.current.pagination).toHaveProperty("page", 1);
    });

    it("should not decrement past 1", () => {
      const { result } = renderHook(usePagination, {
        initialProps: {
          page: 1,
          totalPages: 2,
        },
      });

      expect(result.current.pagination).toHaveProperty("page", 1);
      act(() => result.current.goToPreviousPage());
      expect(result.current.pagination).toHaveProperty("page", 1);
    });
  });
});
