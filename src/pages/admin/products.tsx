import Table from "../../components/Table";
import { api } from "../../utils/api";
import { withAuth } from "../../utils/with-auth";

export const AdminProductsPage: React.FC = () => {
  const { data: products } = api.products.getAll.useQuery();

  if (!products) return <div>Loading...</div>;

  return (
    <div>
      <Table
        items={products}
        columns={[
          { key: "name", title: "Name" },
          { key: "price", title: "Price" },
          { key: "description", title: "Description" },
        ]}
        primaryKey="id"
        zebra
      />
    </div>
  );
};

export default withAuth(AdminProductsPage);
