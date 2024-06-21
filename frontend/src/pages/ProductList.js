import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { products } from "../services/auth/UsersService";
import ProductPresentation from "../components/ProductPresentation";
import Sidebar from "../components/SideBar";
import Breadcrumb from "../components/Breadcrum";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
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
  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("username")}
          customerPoint={localStorage.getItem("point")}
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
