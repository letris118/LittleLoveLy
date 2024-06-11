import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import backgroundImage from "../assets/images/backgroundDemo.jpg";

export default function ForgotPassword() {
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
                    type="text"
                    className="form-control"
                    placeholder="Nhập gmail"
                    required
                  />
                </div>
                {/* navigate to restPassword */}
                <div className="form-group">
                  <button
                    onClick={() => {
                      navigate({
                        pathname: routes.resetPassword,
                      });
                    }}
                    type="submit"
                    className="form-control btn btn-primary submit px-3">
                    Xác nhận
                  </button>
                </div>
                {/* back to login or register page */}
                <div className="form-group">
                  <div className="forgot-pwd text-center">
                    <a href={routes.forgotPassword} style={{ color: "#fff" }}>
                      Quên mật khẩu ?
                    </a>
                  </div>
                </div>
              </form>
              <p className="w-100 text-center">
                &mdash; Quay lại trang &mdash;
              </p>
              <div className="row">
                <div className="form-group col-md-6 border-right">
                  <div className="forgot-pwd text-center">
                    <a href={routes.login} style={{ color: "#fff" }}>
                      Đăng nhập
                    </a>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="forgot-pwd text-center">
                    <a href={routes.forgotPassword} style={{ color: "#fff" }}>
                      Đắng kí
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
