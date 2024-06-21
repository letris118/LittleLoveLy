import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import BrandDetail from "../pages/BrandDetail";
import BrandList from "../pages/BrandList";

import ManageProduct from "../pages/ManageProduct";
import ManageOrder from "../pages/ManageOrder";
import ManageArticle from "../pages/ManageArticle";
import StaffProfile from "../pages/StaffProfile";
import ManageVoucher from "../pages/ManageVoucher";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";

export default function AppRoute() {
  return (
    <Routes>
      <Route path={routes.homePage} element={<HomePage />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path={routes.forgotPassword} element={<ForgotPassword />} />
      <Route path={routes.resetPassword} element={<ResetPassword />} />
      <Route path={routes.brands} element={<BrandList />} />
      <Route path={`${routes.brands}/:name`} element={<BrandDetail />} />
      <Route path={routes.manageProduct} element={<ManageProduct />} />
      <Route path={routes.manageOrder} element={<ManageOrder />} />
      <Route path={routes.manageArticle} element={<ManageArticle />} />
      <Route path={routes.staffProfile} element={<StaffProfile />} />
      <Route path={routes.manageVoucher} element={<ManageVoucher />} />
      <Route path={routes.products} element={<ProductList />} />
      <Route path={`${routes.products}/:name`} element={<ProductDetail />} />
    </Routes>
  );
}
