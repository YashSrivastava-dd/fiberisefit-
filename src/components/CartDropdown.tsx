import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import productImage from '@/assets/product-fyber.jpg';

export function CartDropdown() {
  const { items, removeFromCart, updateQuantity, getTotalItems, getSubtotal, getTotal } = useCart();
  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 p-0 mt-2"
        sideOffset={8}
      >
        <div className="flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Shopping Cart</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {totalItems === 0 
                ? 'Your cart is empty' 
                : `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
            </p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Start adding items to your cart
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/shop">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="px-4 py-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="h-16 w-16 rounded-lg bg-secondary/50 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image || productImage}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.variant}
                          </p>
                          {item.purchaseType === 'subscription' && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              Subscription
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="text-sm font-medium text-foreground w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-foreground">
                            ₹{(
                              ((item.purchaseType === 'subscription' 
                                ? item.price * 0.85 
                                : item.price) * item.quantity) / 100
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <>
              <Separator />
              <div className="px-6 py-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    ₹{(subtotal / 100).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <Badge variant="secondary" className="text-xs">FREE</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">
                    ₹{(total / 100).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" size="sm" asChild>
                    <Link to="/cart">View Cart</Link>
                  </Button>
                  <Button variant="premium" className="flex-1" size="sm" asChild>
                    <Link to="/checkout" className="flex items-center justify-center">
                      Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

