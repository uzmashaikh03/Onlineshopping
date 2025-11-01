import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Cart, { CartItem } from "@/components/Cart";
import { toast } from "sonner";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import product9 from "@/assets/product-9.jpg";
import product10 from "@/assets/product-10.jpg";
import product11 from "@/assets/product-11.jpg";
import product12 from "@/assets/product-12.jpg";
import product13 from "@/assets/product-13.jpg";
import product14 from "@/assets/product-14.jpg";

// ✅ Define Product type here (including category)
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: "new" | "bestseller";
}

const products: Product[] = [
  { id: "1", name: "Noise Cancelling Headphones", price: 299, image: product1, description: "Block out distractions and enjoy crystal-clear sound with deep bass.", category: "bestseller" },
  { id: "2", name: "Smart Fitness Watch", price: 199, image: product2, description: "Monitor heart rate, steps, and sleep with a bright AMOLED display.", category: "new" },
  { id: "3", name: "Leather Sling Bag", price: 129, image: product3, description: "Stylish and durable sling bag for everyday essentials.", category: "bestseller" },
  { id: "4", name: "RGB Gaming Keyboard", price: 149, image: product4, description: "Mechanical switches with dynamic RGB backlighting and ergonomic design.", category: "new" },
  { id: "5", name: "Wireless Charging Stand", price: 89, image: product5, description: "Fast-charge your phone vertically or horizontally with smart cooling.", category: "bestseller" },
  { id: "6", name: "Portable Bluetooth Speaker", price: 159, image: product6, description: "360° stereo sound with waterproof and dustproof protection.", category: "new" },
  { id: "7", name: "Slim Card Holder", price: 49, image: product7, description: "Compact metal card holder with RFID protection.", category: "bestseller" },
  { id: "8", name: "Ergonomic Mouse", price: 79, image: product8, description: "Comfortable and responsive mouse designed for long-hour usage.", category: "new" },
  { id: "9", name: "SSD Card", price: 200, image: product9, description: "Ultra-fast portable SSD for storing and transferring large files securely.", category: "bestseller" },
  { id: "10", name: "True Wireless Earbuds", price: 179, image: product10, description: "Enjoy immersive sound with noise cancellation and long battery life.", category: "bestseller" },
  { id: "11", name: "Smart Home Hub", price: 249, image: product11, description: "Control your lights, music, and security devices with voice commands.", category: "new" },
  { id: "12", name: "Wireless Earphones Pro", price: 199, image: product12, description: "Crystal-clear sound, comfortable fit, and smart touch controls.", category: "new" },
  { id: "13", name: "4K Action Camera", price: 349, image: product13, description: "Capture your adventures in stunning 4K resolution with waterproof design.", category: "bestseller" },
  { id: "14", name: "Smart Table Lamp", price: 89, image: product14, description: "Color-changing LED lamp controllable with app or voice assistant.", category: "new" },
];

const Products = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");

  const filteredProducts =
    filter === "new"
      ? products.filter((p) => p.category === "new")
      : filter === "bestseller"
      ? products.filter((p) => p.category === "bestseller")
      : products;

  const handleAddToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        toast.info(`${product.name} is already in your cart`);
        return items;
      }
      toast.success(`${product.name} added to cart`);
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {filter === "new"
                ? "New Arrivals"
                : filter === "bestseller"
                ? "Bestsellers"
                : "Our Products"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {filter === "new"
                ? "Check out our latest arrivals, freshly added to our collection!"
                : filter === "bestseller"
                ? "Discover our top-selling products loved by our customers."
                : "Explore premium, stylish, and innovative tech products for everyday use."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </main>

     

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Products;
