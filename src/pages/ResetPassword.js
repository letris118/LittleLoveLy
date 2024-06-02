import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import backgroundImage from "../assets/images/backgroundDemo.jpg";

export default function ResetPassword() {
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
    <div className="ftco-section-forgot-pwd">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Đặt lại mật khẩu</h3>
              <form action="#" className="signin-form">
                <div className="form-group">
                  <input
                    id="password-field"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Nhập mật khẩu mới"
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
                    type="text"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                    required
                  />
                </div>
                {/* navigate to homepage */}
                <div className="form-group">
                  <button
                    onClick={() => {
                      navigate({
                        pathname: routes.homePage,
                      });
                    }}
                    type="submit"
                    className="form-control btn btn-primary submit px-3">
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
