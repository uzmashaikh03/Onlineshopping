import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutProps {
  cartItems: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  cartTotal: number;
  onPlaceOrder: () => void;
}

const Checkout = ({ cartItems, cartTotal, onPlaceOrder }: CheckoutProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fill all the fields before placing the order.");
      return;
    }

    onPlaceOrder();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="space-y-2 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Enter your street address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            name="pincode"
            placeholder="Enter your pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4 bg-black text-white hover:bg-gray-800">
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
