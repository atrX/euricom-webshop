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
    </div>
  );
};

export default withAuth(AdminProductsPage, ["ADMIN"]);
