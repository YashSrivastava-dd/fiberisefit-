import { Link } from "react-router-dom";
import { Award, Mail, Phone } from "lucide-react";

const Footer = () => {
  const policyLinks = [
    { name: "Shipping & Delivery Policy", path: "/shipping-policy" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact-policy" },
    { name: "Cancellation & Refund Policy", path: "/refund-policy" },
    { name: "Terms & Conditions", path: "/terms-conditions" },
  ];

  return (
    <footer className="bg-gradient-accent text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-foreground">Fiberise</span>
              <span className="text-2xl font-light text-primary-foreground/90">Fit</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Premium weight loss and wellness solutions backed by clinical research and patent-pending technology.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <Award className="h-4 w-4 text-primary-foreground" />
              <span>Clinically Validated • GMP Certified • Patent-Pending</span>
            </div>
          </div>

          {/* Policies Section */}
          <div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-4">Policies</h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/science"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  to="/results"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@fiberisefit.com"
                  className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  support@fiberisefit.com
                </a>
              </li>
              <li>
                <a
                  href="tel:7011803119"
                  className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  7011803119
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} FIBERISE FIT PRIVATE LIMITED. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/70">
              731/508 S/F, PLOT NO.7 BLOCK 56 DB GUPTA ROAD Karol Bagh Central Delhi New Delhi Delhi India 110005
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

