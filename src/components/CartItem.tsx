import { useEffect, useMemo, useState } from "react";
import { MdAdd, MdDelete, MdRemove } from "react-icons/md";
import debounce from "lodash/debounce";
import Button from "./Button";
import Card from "./Card";
import NumericInput from "./NumericInput";

export type CartItemProps = {
  image: string;
  onQuantityChange: (quantity: number) => void;
  price: number;
  quantity: number;
  title: string;
};

const CartItem: React.FC<CartItemProps> = ({
  image,
  onQuantityChange,
  price,
  quantity,
  title,
}) => {
  const [amount, setAmount] = useState(quantity);

  const debouncedQuantityChangeHandler = useMemo(
    () => debounce(onQuantityChange, 1000),
    [onQuantityChange]
  );

  useEffect(() => {
    return () => debouncedQuantityChangeHandler.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAmount(quantity);
  }, [quantity]);

  function updateAmount(amount: number | null) {
    const newAmount = Math.max(amount ?? 0, 0);

    if (newAmount > 0) {
      setAmount(newAmount);
      debouncedQuantityChangeHandler(newAmount);
    } else {
      onQuantityChange(newAmount);
    }
  }

  return (
    <Card title={title} image={image}>
      <div className="flex flex-row items-center gap-2">
        <span>Quantity:</span>
        <NumericInput value={amount} onChange={updateAmount} />
        <Button variant="success" onClick={() => updateAmount(amount + 1)}>
          <MdAdd />
        </Button>
        <Button variant="warning" onClick={() => updateAmount(amount - 1)}>
          <MdRemove />
        </Button>
        <Button variant="error" onClick={() => onQuantityChange(0)}>
          <MdDelete />
        </Button>
      </div>
      <div>
        {amount} x &euro;{price.toFixed(2)} = &euro;
        {(amount * price).toFixed(2)}
      </div>
    </Card>
  );
};

export default CartItem;
