import { Link, Route, Routes } from "react-router";
import Cart from "./pages/cart";
import Products from "./pages/products";
import ProductDetail from "./pages/product-detail";
import { useCartStore } from "./store/useCartStore";
import ThemeSwitcher from "./components/themeSwithcer";

function App() {
  const items = useCartStore((state) => state.items);
  return (
    <>
      <div>
        <nav className="p-5 border-b flex gap-5">
          <Link to="/">Products</Link>
          <Link to="/cart">Cart ({items.length})</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  
    </>
  );
}

export default App;
