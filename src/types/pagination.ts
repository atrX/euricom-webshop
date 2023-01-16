export type PaginationOptions = {
  order?: "asc" | "desc";
  orderBy?: string;
  page?: number;
  rowsPerPage?: number;
};

export type PaginationState = Required<Omit<PaginationOptions, "orderBy">> &
  Pick<PaginationOptions, "orderBy"> & {
    totalPages: number;
    totalRows: number;
  };

export type PagedResult<T> = {
  pagination: PaginationState;
  items: Array<T>;
};
