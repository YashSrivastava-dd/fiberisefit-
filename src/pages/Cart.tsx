import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import productImage from "@/assets/product-fyber.jpg";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getSubtotal, getTotal } = useCart();
  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="h-32 w-32 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start your transformation journey by adding Fyber to your cart
            </p>
            <Link to="/shop">
              <Button size="lg" variant="premium">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemPrice = item.purchaseType === 'subscription' 
                ? item.price * 0.85 
                : item.price;
              const itemTotal = itemPrice * item.quantity;
              
              return (
                <Card key={item.id} className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="h-32 w-32 rounded-lg bg-secondary/30 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image || productImage}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.variant}</p>
                          {item.purchaseType === 'subscription' && (
                            <Badge variant="secondary" className="mt-1">
                              Subscription
                            </Badge>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-foreground font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">
                            ₹{(itemTotal / 100).toLocaleString()}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-muted-foreground">
                              ₹{(itemPrice / 100).toLocaleString()} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>₹{(subtotal / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <Badge variant="secondary">FREE</Badge>
                </div>
                <div className="pt-4 border-t border-border flex justify-between">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">
                    ₹{(total / 100).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" variant="premium" className="w-full mb-3">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/shop">
                <Button size="lg" variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
                <p>✓ Free Shipping on all orders</p>
                <p>✓ 100-Day Money-Back Guarantee</p>
                <p>✓ Secure Checkout</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
