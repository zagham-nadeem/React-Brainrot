import { Button } from "@/components/ui/button";
import { Link } from "react-router"; // Assuming react-router-dom or similar
import { ShoppingCart } from "lucide-react"; // Optional: Adds a nice icon
import { useCartStore } from "@/store/useCartStore";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1200,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 999,
    category: "Mobile"
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 349,
    category: "Audio"
  },
];

export default function Products() {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Products
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Premium electronics selected just for you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div 
              key={p.id} 
              className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >

              {/* Content Area */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex-1">
                  <p className="mb-1 text-xs font-medium text-emerald-600 uppercase tracking-wide">
                    {p.category}
                  </p>
                  <Link to={`/detail/${p.id}`}>
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                      {p.name}
                    </h2>
                  </Link>
                </div>

                {/* Footer: Price & Action */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <span className="text-xl font-bold text-gray-900">
                    ${p.price.toLocaleString()}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-slate-900 hover:bg-emerald-600 transition-colors"
                    onClick={() => addItem(p)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}