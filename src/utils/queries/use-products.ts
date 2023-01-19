import { useEffect } from "react";
import { api } from "../api";
import { usePagination } from "../use-pagination";

export function useProducts() {
  const paginationProps = usePagination();
  const { pagination, setPagination } = paginationProps;

  const trpcUtils = api.useContext();
  const queryProps = api.products.getPaged.useQuery(pagination);
  const { mutate: remove } = api.products.remove.useMutation({
    onSuccess(data) {
      void trpcUtils.products.get.invalidate(data.id);
      void trpcUtils.products.getPaged.invalidate();
    },
  });

  const { items, pagination: paginationResult } = queryProps.data ?? {};

  useEffect(() => {
    setPagination((previousPagination) => ({
      ...previousPagination,
      ...paginationResult,
    }));
  }, [paginationResult, setPagination]);

  return {
    ...queryProps,
    ...paginationProps,
    data: items,
    remove,
  };
}
