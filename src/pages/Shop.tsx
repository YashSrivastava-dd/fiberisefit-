import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import productImage from "@/assets/product-fiber-x.jpg";

const Shop = () => {
  // Future-ready for multiple products
  const products = [
    {
      id: "fiber-x",
      name: "Fiber-X",
      tagline: "Daily Weight Loss Sachet",
      price: 3499,
      originalPrice: 4999,
      rating: 4.8,
      reviews: 1247,
      image: productImage,
      badge: "Best Seller",
      benefits: ["100-Day Protocol", "Patent-Pending", "Clinically Tested"],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
            Shop Premium Wellness
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Science-backed formulations designed for sustainable transformation
          </p>
        </div>

        {/* Future: Filters & Sort */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>
          {/* Future filter options will go here */}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-premium"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-secondary/30">
                {product.badge && (
                  <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.tagline}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-gold text-gold"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2">
                  {product.benefits.map((benefit, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="text-xs"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{(product.price / 100).toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{(product.originalPrice / 100).toLocaleString()}
                    </span>
                  )}
                  <Badge variant="destructive" className="ml-auto">
                    30% OFF
                  </Badge>
                </div>

                {/* CTA */}
                <Link to={`/product/${product.id}`} className="block">
                  <Button 
                    className="w-full" 
                    size="lg"
                    variant="premium"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">100%</div>
            <div className="text-muted-foreground">Money-Back Guarantee</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">1000+</div>
            <div className="text-muted-foreground">5-Star Reviews</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
