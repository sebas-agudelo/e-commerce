import "./scss/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";

import SignUp from "./pages/auth_pages/SignUp";
import ConfirmSignup from "./pages/auth_pages/ConfirmSignup";
import SignIn from "./pages/auth_pages/SignIn";
import ResetPassword from "./pages/auth_pages/ResetPassword";
import ResetPasswordLink from "./pages/auth_pages/ResetPasswordLink";
import Profile from "./pages/auth_pages/Profile";
import AllProducts from "./pages/product_pages/AllProducts";
import Cart from "./pages/cart_payment_pages/Cart";
import CheckOut from "./pages/cart_payment_pages/CheckOut";
import { ProductProvider } from "./Context/ProductContext";
import { CartProvider } from "./Context/CartContext";
import ProductDetails from "./pages/product_pages/ProductDetails";
import AddProduct from "./pages/product_pages/AddProduct";
import UpdateProduct from "./pages/product_pages/UpdateProduct";
import UserData from "./pages/auth_pages/UserData";


function App() {

  return (
    <div className="App">
  
      <BrowserRouter>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/product/create" element={<AddProduct />} />
              <Route path="/product/update/:id" element={<UpdateProduct />} />


              <Route path="/checkout" element={<CheckOut />} />

              {/* AUTH PAGES */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/confirm/:tokenHash" element={<ConfirmSignup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/resetpwdlink" element={<ResetPasswordLink />} />
              <Route path="/resetpwd/:tokenHash" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register/information" element={<UserData />} />

            </Routes>
          </CartProvider>
        </ProductProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
