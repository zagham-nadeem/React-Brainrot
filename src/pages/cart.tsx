import { Button } from "@/components/ui/button";
import { Link } from "react-router"; // or 'react-router-dom'
import { Trash2, ArrowRight, ShoppingBag, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Cart() {
  // Mock data for visualization - replace with your store logic
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 px-4">
        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
          <ShoppingBag className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Your cart is empty
        </h2>
        <p className="text-gray-500 max-w-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/products">
          <Button className="mt-4">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {/* Header Row (Hidden on mobile, visible on desktop) */}
              <div className="hidden sm:grid grid-cols-12 text-sm font-medium text-gray-500 pb-4 border-b border-gray-200">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Price</div>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col sm:grid sm:grid-cols-12 gap-4 py-4 border-b border-gray-100 last:border-0"
                >
                  {/* Product Name & Details */}
                  <div className="col-span-6 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                  </div>

                  {/* Quantity Controls */}
                  {/* Quantity Controls */}
                  <div className="col-span-3 flex items-center justify-between sm:justify-center">
                    <div className="flex items-center border border-gray-200 rounded-md">
                      {/* --- FIXED BUTTON START --- */}
                      <Button
                        className="p-2"
                        variant={item.quantity > 1 ? "default" : "destructive"}
                        size="icon" // Added size="icon" for better square dimension handling
                        onClick={() => decreaseItem(item.id)} // Handler moved here!
                      >
                        {item.quantity > 1 ? (
                          <Minus className="h-3 w-3" />
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}
                      </Button>
                      {/* --- FIXED BUTTON END --- */}

                      <span className="px-2 text-sm font-medium min-w-8 text-center">
                        {item.quantity}
                      </span>

                      <Button
                        onClick={() => addItem(item)}
                        className="p-2"
                        size="icon"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Mobile Remove Button */}
                    <Button
                      onClick={() => removeItem(item.id)} // Ensure this also has a handler
                      className="sm:hidden text-red-500 hover:text-red-600 text-sm font-medium"
                      variant="ghost"
                    >
                      Remove
                    </Button>
                  </div>

                  {/* Price & Desktop Remove */}
                  <div className="col-span-3 flex items-center justify-between sm:justify-end gap-4">
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>

                    <Button
                      variant="destructive-outline"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="h-px bg-gray-200 my-4" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">
                  Order Total
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${total.toLocaleString()}
                </span>
              </div>

              <Button className="w-full py-6 text-lg bg-gray-900 hover:bg-emerald-600 transition-colors">
                Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center"
                >
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
