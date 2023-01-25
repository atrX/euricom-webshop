import type { Product } from "@prisma/client";
import type {
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { type NextPage } from "next";
import Card from "../components/Card";
import Grid from "../components/Grid";
import ScrollLoader from "../components/ScrollLoader";
import type { PagedResult } from "../types/pagination";
import { api } from "../utils/api";
import { useCart } from "../utils/queries/use-cart";

const Products: NextPage = () => {
  // TODO: for some reason the typing is messed up, investigate
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    (api.products.getPaged as any).useInfiniteQuery(undefined, {
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.pagination;
        return page < totalPages ? page + 1 : undefined;
      },
    } as UseInfiniteQueryOptions<PagedResult<Product>>) as UseInfiniteQueryResult<
      PagedResult<Product>
    >;
  const { addToCart } = useCart();

  const products = data?.pages.flatMap((page) => page.items);

  if (isLoading || !products) return <div>Loading...</div>;

  function loadMoreProducts() {
    if (!hasNextPage) return;
    void fetchNextPage();
  }

  return (
    <Grid>
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.name}
          image={product.image}
          actionText={product.stock > 0 ? "Add to cart" : "Out of stock"}
          onActionClick={
            product.stock > 0
              ? () => addToCart({ productId: product.id })
              : undefined
          }
        >
          <p>{product.description}</p>
        </Card>
      ))}
      <div className="col-span-full">
        <ScrollLoader isVisible={isFetching} onIntersect={loadMoreProducts} />
      </div>
    </Grid>
  );
};

export default Products;
