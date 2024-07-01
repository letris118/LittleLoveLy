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
import Cart from "../pages/Cart";
import StaffHomePage from "../pages/StaffHomePage";
import StaffChat from "../pages/StaffChat";
import ManageGift from "../pages/ManageGift";
import StaffBrandList from "../pages/StaffBrandList";
import UpdateProduct from "../pages/UpdateProduct";
import AddProduct from "../pages/AddProduct";
import Checkout from "../pages/Checkout";
import Statistics from "../pages/Statistics";
import ManageStaff from "../pages/ManageStaff";
import ManageMember from "../pages/ManageMember";
import AddGift from "../pages/AddGift";
import UpdateGift from "../pages/UpdateGift";
import AddVoucher from "../pages/AddVoucher";

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
      <Route path={routes.cart} element={<Cart />} />
      <Route path={routes.staffHomePage} element={<StaffHomePage />} />
      <Route path={routes.staffChat} element={<StaffChat />} />
      <Route path={routes.manageGift} element={<ManageGift />} />
      <Route path={routes.staffBrandList} element={<StaffBrandList />} />
      <Route path={`${routes.updateProduct}/:name`} element={<UpdateProduct />} />
      <Route path={routes.addProduct} element={<AddProduct />} />
      <Route path={routes.checkout} element={<Checkout />} />
      <Route path={routes.statistics} element={<Statistics />} />
      <Route path={routes.manageMember} element={<ManageMember />} />
      <Route path={routes.manageStaff} element={<ManageStaff />} />
      <Route path={routes.addGift} element={<AddGift />} />
      <Route path={`${routes.updateGift}/:name`} element={<UpdateGift />} />
      <Route path={routes.addVoucher} element={<AddVoucher />} />
    </Routes>
  );
}
