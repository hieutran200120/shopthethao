import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "../src/layouts/Layout";
import Home from "./page/Home";
import Tables from "./page/product/Tables";
import Billing from "./page/Billing";
import Profile from "../src/page/Profile";
import Main from "./layouts/admin/layout/Main";
import Category from './page/admin/category/Caterory';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ProductBoy } from './page/user/product/ProductBoy';
import Productdetail from './page/user/product/Productdetail';
import Product from './page/user/category/Product';
import Login from './page/user/login/Login';
import Register from './page/user/register/Register';
import Pay from './page/user/order/Pay';
import { ProductProvider } from './utils/helpers/getHelper';
import "../src/css/main.scss";
import "../src/css/fonts.scss";
import "../src/css/bootstrap.scss";
import "../src/css/picbox.scss";
import Oder from './page/user/order/Oder';

function App() {
  const rolesString = sessionStorage.getItem("roles");
  const isAdmin = rolesString && rolesString.includes("admin");
  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    if (isAdmin) {
      // Nếu là admin, chuyển hướng đến trang admin
      <Navigate to="/dashboard" />;
    } else {
      // Nếu không phải admin, chuyển hướng đến trang người dùng thông thường
      <Navigate to="/" />;
    }
  }, [isAdmin, rolesString]);
  return (
    <Router>
      <div className="App">
        <ProductProvider>
          {isAdmin ? (
            <Main>
              <Routes>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/category" element={<Category />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Main>
          ) : (
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<ProductBoy />} />
                <Route path="/product/:id" element={<Productdetail />} />
                <Route path="/order" element={<Oder />} />
                <Route path="/category/:id" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path='/order/pay' element={<Pay />} />
            </Routes>
          )}
        </ProductProvider>
      </div>
    </Router>
  );
}

export default App;
