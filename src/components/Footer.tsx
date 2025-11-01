import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ---- SHOP INTRO ---- */}
          <div>
            <h3 className="text-xl font-bold mb-4">SHOP</h3>
            <p className="text-primary-foreground/80 text-sm">
              Your destination for premium products with exceptional quality.
            </p>
          </div>

          {/* ---- SHOP LINKS ---- */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products?filter=new"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/products?filter=bestseller"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* ---- SUPPORT LINKS ---- */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* ---- COMPANY LINKS ---- */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-fast"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ---- COPYRIGHT ---- */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 SHOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
