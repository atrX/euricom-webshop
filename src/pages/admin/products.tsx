import { MdDelete, MdEdit } from "react-icons/md";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { useProducts } from "../../utils/queries/use-products";
import { useDialog } from "../../utils/use-dialog";
import { withAuth } from "../../utils/with-auth";

export const AdminProductsPage: React.FC = () => {
  const { showConfirmation } = useDialog();
  const {
    data: products,
    isLoading,
    pagination,
    setPagination,
    remove,
  } = useProducts();

  if (isLoading || !products) return <div>Loading...</div>;

  function goToPageHandler(page: number) {
    setPagination((previousPagination) => ({
      ...previousPagination,
      page,
    }));
  }

  async function removeProduct(id: string) {
    const result = await showConfirmation(
      "Are you sure you want to remove this product?"
    );
    if (result) {
      remove(id);
    }
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
          { key: "id", title: "Actions", sticky: true },
        ]}
        primaryKey="id"
        zebra
      >
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="max-h-12"
              />
            </td>
            <td>&euro;{product.price.toFixed(2)}</td>
            <td>{product.description}</td>
            <td className="sticky right-0">
              <div className="flex flex-row gap-1">
                <Button
                  variant="error"
                  size="sm"
                  onClick={() => void removeProduct(product.id)}
                >
                  <MdDelete />
                </Button>
              </div>
            </td>
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
