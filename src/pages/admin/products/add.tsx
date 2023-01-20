import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../../../components/Button";
import { withAuth } from "../../../utils/with-auth";
import ProductForm from "../../../components/forms/ProductForm";

export const AdminAddProductPage: NextPage = () => {
  const router = useRouter();

  function goToProductsOverview() {
    void router.push("/admin/products");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-row justify-end">
        <Button onClick={goToProductsOverview}>Go back</Button>
      </div>

      <ProductForm onSubmit={goToProductsOverview} />
    </div>
  );
};

export default withAuth(AdminAddProductPage, ["ADMIN"]);
