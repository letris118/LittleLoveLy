import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import { articles, brands, products } from "../services/auth/UsersService";
import BrandPresentation from "../components/BrandPresentation";
import "../assets/css/homePage.css";
import ProductPresentation from "../components/ProductPresentation";
import Sidebar from "../components/SideBar";
import ArticlePresentation from "../components/ArticlePresentation";

export default function HomePage() {
  const [productList, setProductList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await products();
        if (response) {
          setProductList(response.slice(0, 20));
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Không thể tải sản phẩm");
        setProductList([]);
      }
    };

    const fetchBrands = async () => {
      try {
        let response = await brands();
        if (response) {
          setBrandList(response.slice(0, 8));
        } else {
          setBrandList([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Không thể tải được nhãn hàng");
        setArticleList([]);
      }
    };

    const fetchArticles = async () => {
      try {
        let response = await articles();
        if (response) {
          setArticleList(response.slice(0, 3));
        } else {
          setArticleList([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast.error("Không thể tải được tin tức");
        setBrandList([]);
      }
    };

    // chỗ này để vô trang tài khoản

    // if (localStorage.getItem("token")) {
    //   const fetchCustomerInfo = async () => {
    //     try {
    //       const token = localStorage.getItem("token");
    //       const decoded = jwtDecode(token);
    //       let response = await users();
    //       if (response) {
    //         const userInfo = response.find(
    //           (user) => user.username === decoded.sub
    //         );
    //         setCustomerInfo(userInfo);
    //       } else {
    //         setCustomerInfo([]);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching customer info:", error);
    //       toast.error("Không thể tải thông tin khách hang");
    //     }
    //   };

    //   fetchCustomerInfo();
    // }

    fetchBrands();
    fetchProducts();
    fetchArticles();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Header />

      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />

        <div className="content-detail">
          <div className="content-display ">
            <div className="content-row-1">
              <div className="row-top " style={{ width: "100%" }}>
                <h4>Thương hiệu</h4>
                <Link
                  to={routes.brands}
                  style={{ textDecoration: "none", color: "#ff469e" }}>
                  Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <div className="row-1-bottom">
                <BrandPresentation brands={brandList} />
              </div>
            </div>
            <div className="content-row-2">
              <div className="row-top">
                <h4>Thông tin bổ ích</h4>
                <Link
                  to={routes.articles}
                  style={{ textDecoration: "none", color: "#ff469e" }}>
                  Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <ArticlePresentation articles={articleList} />
            </div>
            <div className="content-row-3">
              <div className="row-top ">
                <h4>Sản phẩm</h4>
                <Link
                  to={routes.products}
                  style={{ textDecoration: "none", color: "#ff469e" }}>
                  Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <div className="row-3-bottom">
                <ProductPresentation products={productList} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
