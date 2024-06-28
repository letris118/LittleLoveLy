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
import ManageVoucher from "../pages/ManageVoucher";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import StaffHomePage from "../pages/StaffHomePage";
import StaffChat from "../pages/StaffChat";
import ManageGift from "../pages/ManageGift";
import StaffBrandList from "../pages/StaffBrandList";
import UpdateProduct from "../pages/UpdateProduct";
import AddProduct from "../pages/AddProduct";

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
      <Route path={routes.manageVoucher} element={<ManageVoucher />} />
      <Route path={routes.products} element={<ProductList />} />
      <Route path={`${routes.products}/:name`} element={<ProductDetail />} />
      <Route path={routes.staffHomePage} element={<StaffHomePage />} />
      <Route path={routes.staffChat} element={<StaffChat />} />
      <Route path={routes.manageGift} element={<ManageGift />} />
      <Route path={routes.staffBrandList} element={<StaffBrandList />} />
      <Route path={`${routes.updateProduct}/:name`} element={<UpdateProduct />} />
      <Route path={routes.addProduct} element={<AddProduct />} />
    </Routes>
  );
}
