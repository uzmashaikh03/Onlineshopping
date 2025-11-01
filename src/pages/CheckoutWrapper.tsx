import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Checkout from "./Checkout";
import { CartItem } from "@/components/Cart";
import { toast } from "sonner";

const CheckoutWrapper = () => {
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    const itemsParam = searchParams.get("items");
    if (itemsParam) {
      try {
        const items: CartItem[] = JSON.parse(decodeURIComponent(itemsParam));
        setCartItems(items);
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setCartTotal(total);
      } catch (error) {
        console.error("Failed to parse cart items:", error);
      }
    }
  }, [searchParams]);

  const handleClearCart = () => {
    setCartItems([]);
    setCartTotal(0);
  };

  const handlePlaceOrder = () => {
    toast.success("🎉 Your order has been placed successfully!");
    handleClearCart();
  };

  return (
    <Checkout
      cartItems={cartItems}          
      cartTotal={cartTotal}
      onClearCart={handleClearCart}
      onPlaceOrder={handlePlaceOrder}
    />
  );
};

export default CheckoutWrapper;
