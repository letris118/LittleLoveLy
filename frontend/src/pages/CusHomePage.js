import React, { useEffect, useState } from "react";
import { routes } from "../routes";
import { toast } from "react-toastify";
import {
  articles,
  brands,
  products,
  users,
} from "../services/auth/UsersService";
import { Link, useNavigate } from "react-router-dom";
import BrandPresentation from "../components/BrandPresentation";
import ProductPresentation from "../components/ProductPresentation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";

export default function CusHomePage() {
  const [productList, setProductList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate(routes.homePage); // chuyển về trang chưa đăng nhập
    toast.success("Đăng xuất thành công");
  };

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
        toast.error("Không thể tải thong tin khach hang");
      }
    };
    // Call the function
    fetchBrands();
    fetchProducts();
    fetchArticles();
    fetchCustomerInfo();
  }, []);
  return (
    <div>
      <Header />
      <div className="content">
        <div className="side-bar">
          <div className="profile">
            <div className="profile-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </div>
            <div className="profile-name">
              <p>{customerInfo.name}</p>
            </div>
            <div className="profile-point">
              <p>
                <i
                  class="fa-solid fa-coins"
                  style={{ color: "rgb(201, 201, 7)" }}></i>
                &nbsp;{customerInfo.point}
              </p>
            </div>
          </div>
          <div className="nav-bar">
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-fill-gear"
                viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
              </svg>
              Tài khoản
            </Link>
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              Giỏ hàng
            </Link>
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bag-fill"
                viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
              </svg>
              Đơn hàng
            </Link>
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-gift-fill"
                viewBox="0 0 16 16">
                <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9z" />
              </svg>
              Đổi quà
            </Link>
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chat-right-text-fill"
                viewBox="0 0 16 16">
                <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
              </svg>
              Chăm sóc khách hàng
            </Link>
            <Link onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-left"
                viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                />
              </svg>
              Đăng xuất
            </Link>
          </div>
        </div>

        <div className="content-detail">
          {/* <button onClick={handleLogout}>Đăng xuất</button> */}
          <div className="content-display ">
            <div className="content-row-1">
              <div className="row-1-top " style={{ width: "100%" }}>
                <h4>Thương hiệu</h4>
                <Link
                  to=""
                  style={{ textDecoration: "none", color: "#ff469e" }}>
                  Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <div className="row-1-bottom">
                <BrandPresentation brands={brandList} />
              </div>
            </div>
            <div className="content-row-2">2</div>
            <div className="content-row-3">
              <div className="row-3-top ">
                <h4>Sản phẩm</h4>
                <Link
                  to=""
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
