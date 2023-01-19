import { useRouter } from "next/router";
import Button from "../../../components/Button";
import { withAuth } from "../../../utils/with-auth";
import ProductForm from "../../../components/forms/ProductForm";
import { api } from "../../../utils/api";

export const AdminEditProductPage: React.FC = () => {
  const router = useRouter();

  const productId = router.query.id as string;
  const { data, isLoading } = api.products.get.useQuery(productId);

  if (isLoading || !data) return <div>Loading...</div>;

  function goToProductsOverview() {
    void router.push("/admin/products");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-row justify-end">
        <Button onClick={goToProductsOverview}>Go back</Button>
      </div>

      <ProductForm product={data} onSubmit={goToProductsOverview} />
    </div>
  );
};

export default withAuth(AdminEditProductPage, ["ADMIN"]);
