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
import ProductList from "../pages/ProductList";

export default function AppRoute() {
  return (
    <Routes>
      <Route path={routes.homePage} element={<HomePage />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path={routes.forgotPassword} element={<ForgotPassword />} />
      <Route path={routes.resetPassword} element={<ResetPassword />} />
      <Route path={routes.brands} element={<BrandList />} />
      <Route path={`${routes.brands}/:n  ame`} element={<BrandDetail />} />
      <Route path={routes.products} element={<ProductList />} />
    </Routes>
  );
}
