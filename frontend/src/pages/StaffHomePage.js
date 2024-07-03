import React, { useEffect, useState } from "react";
import StaffHeader from "../components/StaffHeader";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import { articles, brands, products } from "../services/auth/UsersService";
import BrandPresentation from "../components/BrandPresentation";
import "../assets/css/homePage.css";
import ProductPresentation from "../components/ProductPresentation";
import StaffSideBar from "../components/StaffSideBar";
import ArticlePresentation from "../components/ArticlePresentation";
import StaffBackToTop from "../components/StaffBackToTop"
export default function StaffHomePage() {
  const [productList, setProductList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };
    checkAuthentication();

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
        setBrandList([]);
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
      <StaffHeader />

      <div className="manage-content">
        <StaffSideBar />

        <div className="manage-content-detail">
          <div className="manage-content-display ">
            <div className="manage-content-row-1">
              <div className="manage-row-1-top " style={{ width: "100%" }}>
                <h4>Thương hiệu</h4>
                <Link
                  to={routes.staffBrandList}
                  style={{ textDecoration: "none", color: "#ff469e" }}>
                  Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <div className="manage-row-1-bottom">
                <BrandPresentation brands={brandList} />
              </div>
            </div>
            <div className="manage-content-row-2">
              <div className="row-top">
                <h4>Thông tin bổ ích</h4>
                <Link
                  to={routes.staffArticleList}
                  style={{ textDecoration: "none", color: "#ff469e" }}>
                  Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <ArticlePresentation articles={articleList} />
            </div>
            <div className="manage-content-row-3">
              <div className="manage-row-3-top ">
                <h4>Sản phẩm</h4>
                <Link
                  to={routes.staffProductList}
                  style={{ textDecoration: "none", color: "#ff469e" }}>
                  Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <div className="manage-row-3-bottom">
                <ProductPresentation products={productList} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <StaffBackToTop />
    </div>
  );
}
