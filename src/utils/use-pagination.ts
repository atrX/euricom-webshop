import { useState } from "react";
import type { PaginationState } from "../types/pagination";

export function usePagination(options: Partial<PaginationState> = {}) {
  const [pagination, setPagination] = useState<PaginationState>(() => ({
    order: options.order ?? "asc",
    page: options.page ?? 1,
    rowsPerPage: options.rowsPerPage ?? 20,
    orderBy: options.orderBy,
    totalRows: options.totalRows ?? 0,
    totalPages: options.totalPages ?? 0,
  }));

  function goToNextPage() {
    setPagination((previousPagination) => ({
      ...previousPagination,
      page: Math.min(previousPagination.page + 1, pagination.totalPages),
    }));
  }

  function goToPreviousPage() {
    setPagination((previousPagination) => ({
      ...previousPagination,
      page: Math.max(previousPagination.page - 1, 1),
    }));
  }

  return {
    pagination,
    setPagination,
    goToNextPage,
    goToPreviousPage,
  };
}
