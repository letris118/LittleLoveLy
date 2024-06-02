import { useState } from "react";
import React, { useEffect } from "react";
import backgroundImage from "../assets/images/backgroundDemo.jpg";
import "../assets/css/loginAndRegister.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set class and background image for the body
    document.body.classList.add("img");
    document.body.classList.add("js-fullheight");
    document.body.style.backgroundImage = `url(${backgroundImage})`;

    // Cleanup function to remove added class and background image
    return () => {
      document.body.classList.remove("img");
      document.body.classList.remove("js-fullheight");
      document.body.style.backgroundImage = "none";
    };
  }, []);

  return (
    <div className="ftco-section-login">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Đăng nhập LittleLoveLy</h3>
              <form action="#" className="signin-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gmail hoặc Số điện thoại"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    id="password-field"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Mật khẩu"
                    required
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
                    }}></span>
                </div>
                <div className="form-group">
                  <button
                    onClick={() => {
                      navigate({
                        pathname: routes.home,
                      });
                    }}
                    type="submit"
                    className="form-control btn btn-primary submit px-3">
                    Đăng nhập
                  </button>
                </div>
                <div className="form-group">
                  <div className="forgot-pwd text-center">
                    <a href={routes.forgotPassword} style={{ color: "#fff" }}>
                      Quên mật khẩu ?
                    </a>
                  </div>
                </div>
              </form>
              <p className="w-100 text-center">
                &mdash; Chưa có tài khoản ? &mdash;
              </p>
              <div className="form-group">
                <button
                  onClick={() => {
                    navigate({
                      pathname: routes.register,
                    });
                  }}
                  className="form-control btn btn-primary submit px-3">
                  Đăng kí tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
