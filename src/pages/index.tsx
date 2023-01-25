import { type NextPage } from "next";
import Card from "../components/Card";
import Grid from "../components/Grid";
import { useCart } from "../utils/queries/use-cart";
import { useProducts } from "../utils/queries/use-products";

const Products: NextPage = () => {
  const { data: products, isLoading } = useProducts();
  const { addToCart } = useCart();

  if (isLoading || !products) return <div>Loading...</div>;

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
    </Grid>
  );
};

export default Products;
