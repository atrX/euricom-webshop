import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../../../components/Button";
import { withAuth } from "../../../utils/with-auth";
import ProductForm from "../../../components/forms/ProductForm";
import { api } from "../../../utils/api";
import { useProducts } from "../../../utils/queries/use-products";
import { useDialog } from "../../../utils/use-dialog";
import { MdDelete } from "react-icons/md";

export const AdminEditProductPage: NextPage = () => {
  const { showConfirmation } = useDialog();
  const router = useRouter();
  const { removeAsync } = useProducts();

  const productId = router.query.id as string;
  const { data, isLoading } = api.products.get.useQuery(productId);

  if (isLoading || !data) return <div>Loading...</div>;

  function goToProductsOverview() {
    void router.push("/admin/products");
  }

  async function removeProduct(id: string) {
    const result = await showConfirmation(
      "Are you sure you want to remove this product?"
    );
    if (result) {
      await removeAsync(id);
      goToProductsOverview();
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-row justify-end gap-2">
        <Button variant="error" onClick={() => void removeProduct(data.id)}>
          <MdDelete />
        </Button>
        <Button onClick={goToProductsOverview}>Go back</Button>
      </div>

      <ProductForm product={data} onSubmit={goToProductsOverview} />
    </div>
  );
};

export default withAuth(AdminEditProductPage, ["ADMIN"]);
