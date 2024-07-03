import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "../routes";
import backgroundImage from "../assets/images/backgroundDemo.jpg";
import { useFormik } from "formik";
import { resetPasswordAPI } from "../services/auth/UsersService";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    enableReinitialize: true,
    onSubmit: async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");
      setIsSubmitting(true);
      try {
        const response = await resetPasswordAPI(formik.values.password, token);
        if (response) {
          toast.success("Đặt lại mật khẩu thành công");
          navigate(routes.login);
        } else {
          console.log("fail: " + response);
        }
      } catch (error) {
        if (error.response && error.response.data === "Token is expired") {
          toast.error("Yêu cầu hết hạn, vui lòng thử lại");
          navigate(routes.forgotPassword);
        } else if (
          error.response &&
          error.response.data === "Token is not valid"
        ) {
          toast.error("Yêu cầu không hợp lệ");
          navigate(routes.forgotPassword);
        } else {
          console.error(error);
          toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="ftco-section-forgot-pwd">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Đặt lại mật khẩu</h3>
                <form onSubmit={formik.handleSubmit} className="signin-form">
                  <div className="form-group">
                    <input
                      id="password-field"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Nhập mật khẩu mới"
                      required
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
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
                    <input
                      id="confirm-password-field"
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Xác nhận mật khẩu"
                      required
                    />
                    <span
                      toggle="#confirm-password-field"
                      className={
                        showConfirmPassword
                          ? "fa fa-fw fa-eye-slash field-icon"
                          : "fa fa-fw fa-eye field-icon"
                      }
                      onClick={() => {
                        setShowConfirmPassword((prevState) => !prevState);
                      }}
                    ></span>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="form-control btn btn-primary submit px-3"
                    >
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
