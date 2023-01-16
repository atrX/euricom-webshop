import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { api } from "../../utils/api";
import { usePagination } from "../../utils/use-pagination";
import { withAuth } from "../../utils/with-auth";

export const AdminProductsPage: React.FC = () => {
  const { data: products } = api.products.getAll.useQuery();
  const { pagination, setPagination } = usePagination();
  const { data } = api.products.getPaged.useQuery(pagination);
  const { items: products, pagination: paginationResult } = data ?? {};

  useEffect(() => {
    setPagination((previousPagination) => ({
      ...previousPagination,
      ...paginationResult,
    }));
  }, [paginationResult, setPagination]);

  if (!products || !pagination) return <div>Loading...</div>;

  function goToPageHandler(page: number) {
    setPagination((previousPagination) => ({
      ...previousPagination,
      page,
    }));
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Table
        items={products}
        columns={[
          { key: "name", title: "Name" },
          { key: "image", title: "Image" },
          { key: "price", title: "Price" },
          { key: "description", title: "Description" },
        ]}
        primaryKey="id"
        zebra
      >
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} />
            </td>
            <td>&euro;{product.price.toFixed(2)}</td>
            <td>{product.description}</td>
          </tr>
        ))}
      </Table>
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onGoToPage={goToPageHandler}
      />
    </div>
  );
};

export default withAuth(AdminProductsPage, ["ADMIN"]);
