import { useState } from "react";
import React, { useEffect } from "react";
import backgroundImage from "../assets/images/backgroundDemo.jpg";
import "../assets/css/loginAndRegister.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

export default function Register() {
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
    <div className="ftco-section-register">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Đăng kí tài khoản</h3>
              <form action="#" className="signin-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gmail"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    id="password-field"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Mật khẩu"
                    minLength="8"
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
                  <input
                    id="confirm-password-field"
                    type="text"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary submit px-3">
                    Đăng kí
                  </button>
                </div>
              </form>
              <p className="w-100 text-center">
                &mdash; Đã có tài khoản ? &mdash;
              </p>
              <div className="form-group">
                <button
                  onClick={() => {
                    navigate({ pathname: routes.login });
                  }}
                  className="form-control btn btn-primary submit px-3">
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
