import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLogout, products, users } from "../services/auth/UsersService";
import { jwtDecode } from "jwt-decode";
import ProductPresentation from "../components/ProductPresentation";
import Sidebar from "../components/SideBar";
import Breadcrumb from "../components/Breadcrum";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await products();

        if (response) {
          const uniqueProducts = Array.from(
            new Set(response.map((product) => product.productId))
          ).map((id) => {
            return response.find((product) => product.productId === id);
          });
          setProductList(uniqueProducts);
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]);
      }
    };
    fetchProducts();
  }, []);
  if (localStorage.getItem("token")) {
    const fetchCustomerInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        let response = await users();
        if (response) {
          const userInfo = response.find(
            (user) => user.username === decoded.sub
          );
          setCustomerInfo(userInfo);
        } else {
          setCustomerInfo([]);
        }
      } catch (error) {
        console.error("Error fetching customer info:", error);
        toast.error("Không thể tải thông tin khách hang");
      }
    };

    fetchCustomerInfo();
  }
  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerInfo={customerInfo}
          handleLogout={handleLogout(navigate)}
        />

        <div className="content-detail">
          <Breadcrumb value="Tất cả sản phẩm" />
          <div className="content-display ">
            <div className="content-row-3">
              <div className="row-3-top ">
                <h4>Tất cả sản phẩm</h4>
              </div>
              <div className="row-3-bottom">
                <ProductPresentation products={productList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
