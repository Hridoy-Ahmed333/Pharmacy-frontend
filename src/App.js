import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";
import ProductDetail from "./pages/ProductDetail";
import AppLayout from "./Components/AppLayout";
import Login from "./pages/Login";
import Other from "./pages/Other";
import AddProduct from "./pages/AddProduct";
import RequestProduct from "./pages/RequestProduct";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Products />} />
            <Route path="/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
            <Route path="other" element={<Other />} />
            <Route path="request" element={<RequestProduct />} />
            <Route path="addProduct" element={<AddProduct />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
