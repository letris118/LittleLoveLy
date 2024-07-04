import React, { useEffect } from "react";
import { routes } from "../routes";
import backgroundImage from "../assets/images/backgroundDemo.jpg";
import { useFormik } from "formik";
import { forgotPasswordAPI } from "../services/auth/UsersService";
import { toast } from "react-toastify";

export default function ForgotPassword() {
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
      mail: "",
    },
    enableReinitialize: true,
    onSubmit: async () => {
      setIsSubmitting(true);
      try {
        const response = await forgotPasswordAPI(formik.values.mail);
        if (response) {
          toast.success("Kiểm tra mail của bạn để đặt lại mật khẩu");
        } else {
          console.log("fail: " + response);
          setIsSubmitting(false);
        }
      } catch (error) {
        if (error.response && error.response.data === "Mail not found") {
          toast.error("Mail không tồn tại");
        } else {
          console.error(error);
          toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
        }
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
                      type="text"
                      className="form-control"
                      placeholder="Nhập gmail"
                      required
                      name="mail"
                      value={formik.values.mail}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {/* navigate to restPassword */}
                  <div className="form-group">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="form-control btn btn-primary submit px-3">
                      Xác nhận
                    </button>
                  </div>
                  {/* back to login or register page */}
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
                      <a href={routes.register} style={{ color: "#fff" }}>
                        Đăng kí
                      </a>
                    </div>
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
