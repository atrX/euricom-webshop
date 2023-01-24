import type { CartProduct, Product } from "@prisma/client";
import type { NextPage } from "next";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { useCart } from "../utils/queries/use-cart";
import { useDialog } from "../utils/use-dialog";

type CartItemType = CartProduct & { product: Product };

const Cart: NextPage = () => {
  const { showConfirmation } = useDialog();
  const { cart, removeFromCart, setQuantity } = useCart();

  const itemCount =
    cart?.cartProducts.reduce((total, item) => total + item.amount, 0) ?? 0;
  const itemsString = itemCount === 1 ? "item" : "items";
  const totalPrice =
    cart?.cartProducts.reduce(
      (price, item) => price + item.amount * item.product.price,
      0
    ) ?? 0;

  function handleQuantityChange(item: CartItemType, quantity: number) {
    if (!quantity) return removeItem(item);
    setQuantity({
      id: item.id,
      amount: quantity,
    });
  }

  async function removeItem(item: CartItemType) {
    const result = await showConfirmation(
      `Are you sure you want to remove ${item.product.name} from your cart?`
    );
    if (result) void removeFromCart(item.id);
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-grow flex-col gap-4">
        {cart?.cartProducts.map((cartProduct) => (
          <CartItem
            key={cartProduct.id}
            title={cartProduct.product.name}
            image={cartProduct.product.image}
            price={cartProduct.product.price}
            quantity={cartProduct.amount}
            onQuantityChange={(quantity) =>
              void handleQuantityChange(cartProduct, quantity)
            }
          />
        ))}
      </div>
      <div className="flex flex-col">
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Subtotal: &euro;{totalPrice.toFixed(2)}
            </h2>
            <p>
              {itemCount} {itemsString}
            </p>
            <div className="card-actions justify-end">
              <Button disabled>Proceed to checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
