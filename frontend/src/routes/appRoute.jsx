import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

import StaffChat from "../pages/StaffChat";
import Chat from "../pages/Chat";
import ManageGift from "../pages/ManageGift";
import UpdateProduct from "../pages/UpdateProduct";
import AddProduct from "../pages/AddProduct";
import AddArticle from "../pages/AddArticle";
import UpdateArticle from "../pages/UpdateArticle";
import Checkout from "../pages/Checkout";
import ArticleList from "../pages/ArticleList";
import ArticleDetail from "../pages/ArticleDetail";
import Dashboard from "../pages/Dashboard";
import ManageStaff from "../pages/ManageStaff";
import ManageMember from "../pages/ManageMember";

import AddGift from "../pages/AddGift";
import UpdateGift from "../pages/UpdateGift";
import AddVoucher from "../pages/AddVoucher";
import UpdateVoucher from "../pages/UpdateVoucher";

import SearchProduct from "../pages/SearchProduct";
import Gift from "../pages/Gift";
import Order from "../pages/Order";
import ProfileCus from "../pages/ProfileCus";
import StaffProfile from "../pages/StaffProfile";
import UpdateStaff from "../pages/UpdateStaff";
import AddStaff from "../pages/AddStaff";

import { ToastContainer } from "react-toastify";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function AppRoute() {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.forgotPassword} element={<ForgotPassword />} />
        <Route path={routes.resetPassword} element={<ResetPassword />} />

        {/* ============== CUSTOMER ================ */}
        <Route path={routes.homePage} element={<HomePage />} />
        <Route path={routes.brands} element={<BrandList />} />
        <Route path={`${routes.brands}/:name`} element={<BrandDetail />} />

        <Route path={routes.products} element={<ProductList />} />
        <Route
          path={`${routes.products}/:id/:name`}
          element={<ProductDetail />}
        />



        <Route path={routes.checkout} element={<Checkout />} />
        <Route path={routes.articles} element={<ArticleList />} />
        <Route path={`${routes.articles}/:title`} element={<ArticleDetail />} />
        <Route path={routes.cart} element={<Cart />} />
        <Route path={routes.searchProduct} element={<SearchProduct />} />
        <Route path={routes.gift} element={<Gift />} />

        <Route path={routes.staffChat} element={<StaffChat />} />

        <Route path={routes.manageProduct} element={<ManageProduct />} />
        <Route
          path={`${routes.updateProduct}/:name`}
          element={<UpdateProduct />}
        />
        <Route path={routes.addProduct} element={<AddProduct />} />

        <Route path={routes.manageOrder} element={<ManageOrder />} />
        <Route path={routes.manageArticle} element={<ManageArticle />} />
        <Route path={routes.addArticle} element={<AddArticle />} />
        <Route
          path={`${routes.updateArticle}/:id`}
          element={<UpdateArticle />}
        />

        <Route path={routes.manageVoucher} element={<ManageVoucher />} />
        <Route path={routes.addVoucher} element={<AddVoucher />} />
        <Route
          path={`${routes.updateVoucher}/:title`}
          element={<UpdateVoucher />}
        />

        <Route path={routes.manageGift} element={<ManageGift />} />
        <Route path={routes.addGift} element={<AddGift />} />
        <Route path={`${routes.updateGift}/:name`} element={<UpdateGift />} />

        <Route path={routes.dashboard} element={<Dashboard />} />
        <Route path={routes.manageMember} element={<ManageMember />} />
        <Route path={routes.manageStaff} element={<ManageStaff />} />
        <Route path={routes.searchProduct} element={<SearchProduct />} />
        <Route path={routes.gift} element={<Gift />} />
        <Route path={routes.order} element={<Order />} />

        <Route path={routes.profileCustomer} element={<ProfileCus />} />
        <Route path={routes.chat} element={<Chat />} />

        <Route path={routes.staffProfile} element={<StaffProfile />} />
        <Route
          path={`${routes.updateStaff}/:username`}
          element={<UpdateStaff />}
        />
        <Route path={routes.addStaff} element={<AddStaff />} />
      </Routes>
    </>
  );
}
