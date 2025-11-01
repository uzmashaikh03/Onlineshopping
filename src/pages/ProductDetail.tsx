import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Cart, { CartItem } from "@/components/Cart";
import { Product } from "@/components/ProductCard";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

// ✅ Same products list used in Products.tsx for consistency
const mockProducts: Product[] = [
  { id: "1", name: "Noise Cancelling Headphones", price: 299, image: product1, description: "Block out distractions and enjoy crystal-clear sound with deep bass." },
  { id: "2", name: "Smart Fitness Watch", price: 199, image: product2, description: "Monitor heart rate, steps, and sleep with a bright AMOLED display." },
  { id: "3", name: "Leather Sling Bag", price: 129, image: product3, description: "Stylish and durable sling bag for everyday essentials." },
  { id: "4", name: "RGB Gaming Keyboard", price: 149, image: product4, description: "Mechanical switches with dynamic RGB backlighting and ergonomic design." },
  { id: "5", name: "Wireless Charging Stand", price: 89, image: product5, description: "Fast-charge your phone vertically or horizontally with smart cooling." },
  { id: "6", name: "Portable Bluetooth Speaker", price: 159, image: product6, description: "360° stereo sound with waterproof and dustproof protection." },
  { id: "7", name: "Slim Card Holder", price: 49, image: product7, description: "Compact metal card holder with RFID protection and quick access slot." },
  { id: "8", name: "Ergonomic Mouse", price: 79, image: product8, description: "Comfortable and responsive mouse designed for long-hour usage." },
  { id: "9", name: "Smart Home Controller", price: 179, image: product1, description: "Connect and control all smart devices from a single app effortlessly." },
  { id: "10", name: "Wireless Power Bank", price: 99, image: product2, description: "10000mAh portable charger with wireless and fast USB output." },
  { id: "11", name: "Travel Backpack Pro", price: 139, image: product3, description: "Lightweight, water-resistant backpack with hidden pockets and USB port." },
  { id: "12", name: "Foldable Laptop Stand", price: 69, image: product4, description: "Adjustable aluminum stand to improve posture and laptop airflow." },
  { id: "13", name: "Noise-Free Earbuds", price: 169, image: product5, description: "In-ear earbuds with AI-based active noise cancellation technology." },
  { id: "14", name: "Titanium Smart Ring", price: 229, image: product6, description: "Wearable ring for fitness tracking, NFC payments, and notifications." },
  { id: "15", name: "Minimalist Phone Case", price: 39, image: product7, description: "Ultra-thin, shockproof case made from eco-friendly materials." },
  { id: "16", name: "Memory Foam Wrist Pad", price: 29, image: product8, description: "Soft wrist pad for keyboard and mouse users to reduce strain." },
  { id: "17", name: "LED Desk Lamp", price: 59, image: product1, description: "Adjustable color temperature and brightness with touch control." },
  { id: "18", name: "Smart Alarm Clock", price: 99, image: product2, description: "Wake up naturally with light simulation and wireless phone charging." },
  { id: "19", name: "Magnetic Car Mount", price: 35, image: product3, description: "Strong magnetic phone holder that clips easily onto air vents." },
  { id: "20", name: "Digital Drawing Pad", price: 249, image: product4, description: "Pressure-sensitive pen with smooth response for digital artists." },
  { id: "21", name: "Compact Drone Camera", price: 499, image: product5, description: "HD camera drone with GPS tracking and auto-return feature." },
  { id: "22", name: "Smart LED Strip", price: 79, image: product6, description: "Customizable RGB lighting strip controllable via app or voice." },
  { id: "23", name: "Noise-Isolating Headset", price: 189, image: product7, description: "Over-ear gaming headset with surround sound and soft cushions." },
  { id: "24", name: "Portable Projector", price: 299, image: product8, description: "Mini projector with Wi-Fi connectivity and cinematic HD visuals." },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product not found</h1>
            <Button onClick={() => navigate("/products")}>Back to Products</Button>
          </div>
        </main>
      </div>
    );
  }

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
    setIsCartOpen(true);
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

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/products")}
            className="mb-8 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-accent mb-6">${product.price}</p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <Button
                size="lg"
                variant="accent"
                className="w-full gap-2"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              <div className="mt-12 space-y-4 border-t border-border pt-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Free shipping</span>
                  <span className="font-medium">On orders over $100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Easy returns</span>
                  <span className="font-medium">30-day return policy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Secure checkout</span>
                  <span className="font-medium">SSL encrypted</span>
                </div>
              </div>
            </div>
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
}
