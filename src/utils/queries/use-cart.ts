import { api } from "../api";

export function useCart() {
  const trpcUtils = api.useContext();
  const { data: cart, isLoading } = api.cart.getCart.useQuery();
  const { mutate: addToCart } = api.cart.addToCart.useMutation({
    onSuccess() {
      void trpcUtils.cart.getCart.invalidate();
    },
  });
  const { mutate: removeFromCart } = api.cart.removeFromCart.useMutation({
    onSuccess() {
      void trpcUtils.cart.getCart.invalidate();
    },
  });
  const { mutate: setQuantity } = api.cart.setQuantity.useMutation({
    onSuccess() {
      void trpcUtils.cart.getCart.invalidate();
    },
  });

  return {
    addToCart,
    cart,
    isLoading,
    removeFromCart,
    setQuantity,
  };
}
