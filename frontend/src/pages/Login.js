import { useState } from "react";
import React, { useEffect } from "react";
import backgroundImage from "../assets/images/backgroundDemo.jpg";
import "../assets/css/loginAndRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { getCart, loginAPI } from "../services/auth/UsersService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email_or_username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email_or_username || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      setLoadingAPI(true);
      let res = await loginAPI(email_or_username, password);
      const decodedToken = jwtDecode(res);
      if (res) {
        localStorage.clear();
        localStorage.setItem("token", res);
        localStorage.setItem("userRole", decodedToken.roles);
        localStorage.setItem("name", decodedToken.name);
        localStorage.setItem("username", decodedToken.sub);
        localStorage.setItem("point", decodedToken.point);
        if (decodedToken.roles === "ROLE_ADMIN") {
          navigate(routes.statistics);
        } else if (decodedToken.roles === "ROLE_STAFF") {
          navigate(routes.manageProduct);
        } else if (decodedToken.roles === "ROLE_CUSTOMER") {
          navigate(routes.homePage);
          const resCart = await getCart();
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          resCart.orderDetails.map((item) =>
            cart.push({ ...item.product, quantity: item.quantity })
          );
          localStorage.setItem("cart", JSON.stringify(cart));

          const gifts = JSON.parse(localStorage.getItem("gifts")) || [];
          resCart.giftIncludings.map((item) =>
            gifts.push({ ...item.gift, quantity: item.quantity })
          );
          localStorage.setItem("gifts", JSON.stringify(gifts));
        }
      }
    } catch (error) {
      toast.error("Tài khoản hoặc mật khẩu không đúng");
    }
    setLoadingAPI(false);
  };

  // const fetchCart = async () => {
  //   let res = await getCart();
  //   localStorage.setItem("cart", res);
  // };

  useEffect(() => {
    document.body.classList.add("img");
    document.body.classList.add("js-fullheight");
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    if (localStorage.getItem("sessionExpired")) {
      localStorage.removeItem("sessionExpired");
      toast.error("Phiên đăng nhập đã hết hạn");
    }
    let token = localStorage.getItem("token");
    let userRole = localStorage.getItem("userRole");
    if (userRole === "ROLE_CUSTOMER" && token) {
      navigate(routes.homePage);
    } else if (userRole === "ROLE_ADMIN" && token) {
      navigate(routes.statistics);
    } else if (userRole === "ROLE_STAFF" && token) {
      navigate(routes.manageProduct);
    }
    return () => {
      document.body.classList.remove("img");
      document.body.classList.remove("js-fullheight");
      document.body.style.backgroundImage = "none";
    };
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      <div className="ftco-section-login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Đăng nhập LittleLoveLy</h3>
                <form onSubmit={handleLogin} className="signin-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Gmail hoặc Số điện thoại"
                      value={email_or_username}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      toggle="#password-field"
                      className={
                        showPassword
                          ? "fa fa-fw fa-eye-slash field-icon"
                          : "fa fa-fw fa-eye field-icon"
                      }
                      onClick={() => {
                        setShowPassword((prevState) => !prevState);
                      }}
                    ></span>
                  </div>
                  <div className="form-group">
                    <button
                      className={"form-control btn btn-primary submit px-3"}
                      disabled={email_or_username && password ? false : true}
                      type="submit"
                    >
                      Đăng nhập &nbsp;
                      {loadingAPI && <i className="fas fa-spinner fa-spin"></i>}
                    </button>
                  </div>
                  <div className="form-group">
                    <div className="forgot-pwd text-center">
                      <a
                        href={routes.forgotPassword}
                        style={{ color: "#fff", textDecoration: "none" }}
                      >
                        Quên mật khẩu ?
                      </a>
                    </div>
                  </div>
                </form>
                <p className="w-100 text-center">&mdash; Chưa có tài khoản ? &mdash;</p>
                <div className="form-group">
                  <button
                    onClick={() => {
                      navigate({
                        pathname: routes.register,
                      });
                    }}
                    className="form-control btn btn-primary submit px-3"
                  >
                    Đăng kí tài khoản
                  </button>
                </div>
                <div className="form-group">
                  <div className="forgot-pwd text-center">
                    <Link to={routes.homePage} style={{ textDecoration: "none", color: "white" }}>
                      Quay lại trang chủ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
