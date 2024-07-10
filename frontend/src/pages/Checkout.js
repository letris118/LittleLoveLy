import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import "../assets/css/checkout.css";
import {
  createOrder,
  evaluateCart,
  formatPrice,
  getUserInfo,
  previewOrder,
} from "../services/auth/UsersService";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { routes } from "../routes";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogTitle, styled } from "@mui/material";
import VoucherPresentation from "../components/VoucherPresentation";
import { toast } from "react-toastify";

Yup.addMethod(Yup.object, "validatePhoneAndAddress", function (message) {
  return this.test("validatePhoneAndAddress", message, async function (value) {
    const { cusWardCode, cusPhone } = value;
    const { createError } = this;
    try {
      const response = await previewOrder(cusWardCode, cusPhone);
      if (response.code_message && response.code_message === "PHONE_INVALID") {
        return createError({
          path: "cusPhone",
          message: "Số điện thoại không hợp lệ",
        });
      }
      if (response.code_message && response.code_message === "ERR_OVERLOAD") {
        return createError({
          path: "cusWardCode",
          message: "Chưa hỗ trợ giao hàng ở quận/huyện này",
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
});

const checkoutSchema = Yup.object({
  cusName: Yup.string().required("Vui lòng nhập tên người nhận hàng"),
  cusMail: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  cusPhone: Yup.string().required("Vui lòng nhập số điện thoại"),
  cusCityCode: Yup.string().required("Vui lòng chọn tỉnh/thành phố"),
  cusDistrictId: Yup.string().required("Vui lòng chọn quận/huyện"),
  cusWardCode: Yup.string().required("Vui lòng chọn phường/xã"),
  cusStreet: Yup.string().required("Vui lòng nhập địa chỉ"),
  paymentMethod: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
  cartItems: Yup.array().min(1, "Vui lòng chọn sản phẩm"),
}).validatePhoneAndAddress("Custom validation failed");

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [submitCart, setSubmitCart] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [savedValues, setSavedValues] = useState({});
  const [evaluateResult, setEvaluateResult] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openVoucherDialog, setOpenVoucherDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "ROLE_STAFF" || userRole === "ROLE_ADMIN") {
        navigate("/");
      }
    };
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem("username");
      if (!userId) return;
      try {
        let response = await getUserInfo(userId);
        if (response) {
          setUserInfo(response);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const savedFormValues = localStorage.getItem("formValues");
    if (savedFormValues) {
      setSavedValues(JSON.parse(savedFormValues));
    }
    fetchUserInfo();
  }, []);
  const formik = useFormik({
    initialValues: {
      cusName: savedValues.cusName || userInfo.name || "",
      cusMail: savedValues.cusMail || userInfo.mail || "",
      cusPhone: savedValues.cusPhone || userInfo.phone || "",
      cusCityCode: savedValues.cusCityCode || userInfo.cityCode || "",
      cusDistrictId: savedValues.cusDistrictId || userInfo.districtId || "",
      cusWardCode: savedValues.cusWardCode || userInfo.wardCode || "",
      cusStreet: savedValues.cusStreet || userInfo.street || "",
      paymentMethod: savedValues.paymentMethod || "",
      voucherId: savedValues.voucherId || "",
      cartItems: submitCart,
    },
    enableReinitialize: true,
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      localStorage.setItem("formValues", JSON.stringify(values));
      try {
        const response = await createOrder(values);
        if (response) {
          if (formik.values.paymentMethod === "VN_PAY") {
            window.location.href = response.data;
          } else {
            localStorage.removeItem("cart");
            localStorage.removeItem("gifts");
            localStorage.removeItem("formValues");
            toast.success("Đặt hàng thành công");
            navigate(routes.homePage);
          }
        }
      } catch (error) {
        // Handle the error
        console.error("Error during form submission", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const storedGifts = JSON.parse(localStorage.getItem("gifts")) || [];
    setCartItems(storedCartItems);
    const submitCartItems = storedCartItems.map((item) => ({
      id: item.productId,
      itemType: "product",
      quantity: item.quantity,
    }));
    const submitGiftItems = storedGifts.map((item) => ({
      id: item.giftId,
      itemType: "gift",
      quantity: item.quantity,
    }));
    submitCartItems.push(...submitGiftItems);
    setSubmitCart(submitCartItems);

    fetch("http://localhost:8010/api/orders/cities")
      .then((response) => response.json())
      .then((data) => setCities(data.data));

    const fetchDistricts = (province) => {
      if (province) {
        fetch(`http://localhost:8010/api/orders/districts/${province}`)
          .then((response) => response.json())
          .then((data) => setDistricts(data.data));
        setWards([]);
      } else {
        setDistricts([]);
      }
    };

    const fetchWards = (district) => {
      if (district) {
        fetch(`http://localhost:8010/api/orders/wards/${district}`)
          .then((response) => response.json())
          .then((data) => setWards(data.data));
      } else {
        setWards([]);
      }
    };
    if (formik.values.cusCityCode) {
      fetchDistricts(formik.values.cusCityCode);
    } else {
      setDistricts([]);
    }
    if (formik.values.cusDistrictId) {
      fetchWards(formik.values.cusDistrictId);
    } else {
      setWards([]);
    }
  }, [formik.values.cusCityCode, formik.values.cusDistrictId]);

  useEffect(() => {
    const evaluate = async () => {
      let response = await evaluateCart(
        formik.values.cartItems,
        formik.values.cusDistrictId,
        formik.values.cusWardCode,
        formik.values.voucherId
      );
      setEvaluateResult(response);
    };
    evaluate();
  }, [
    formik.values.cartItems,
    formik.values.cusDistrictId,
    formik.values.cusWardCode,
    formik.values.voucherId,
  ]);

  const handleCityChange = (e) => {
    const selectedCityCode = e.target.value;
    formik.setFieldValue("cusCityCode", selectedCityCode);
    formik.setFieldValue("cusDistrictId", "");
    formik.setFieldValue("cusWardCode", "");
    formik.setFieldValue("cusStreet", "");
    setDistricts([]);
    setWards([]);
  };
  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    formik.setFieldValue("cusDistrictId", selectedDistrictId);
    formik.setFieldValue("cusWardCode", "");
    formik.setFieldValue("cusStreet", "");
    setWards([]);
  };

  const handleVoucherClick = () => {
    setOpenVoucherDialog(true);
  };

  const handleCloseVoucherDialog = (voucherId) => {
    setOpenVoucherDialog(false);
    formik.setFieldValue("voucherId", voucherId);
  };

  const CustomDialogTitle = styled(DialogTitle)({
    fontWeight: "bold",
    backgroundColor: "#ff469e",
    color: "white",
    marginBottom: "20px",
  });

  const CustomDialog = styled(Dialog)({
    "& .MuiDialog-paper": {
      width: "50%",
      height: "fit-content",
    },
    "& .MuiPaper-root": {
      borderRadius: "20px",
    },
  });

  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="content-detail">
          <div className="content-display">
            <div className="content-checkout-content">
              <h4>Thông tin thanh toán</h4>
              <form onSubmit={formik.handleSubmit}>
                <div className="content-checkout-tbl">
                  <div className="content-checkout-tbl-left">
                    <div>
                      <input
                        type="text"
                        placeholder="Tên nhận hàng"
                        name="cusName"
                        value={formik.values.cusName}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.cusName && formik.touched.cusName && (
                        <div className="error">{formik.errors.cusName}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Số điện thoại"
                        name="cusPhone"
                        value={formik.values.cusPhone}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.cusPhone && formik.touched.cusPhone && (
                        <div className="error">{formik.errors.cusPhone}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Gmail"
                        name="cusMail"
                        value={formik.values.cusMail}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.cusMail && formik.touched.cusMail && (
                        <div className="error">{formik.errors.cusMail}</div>
                      )}
                    </div>
                    <div className="content-checkout-tbl-left-method-payment">
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formik.values.paymentMethod}
                        onChange={formik.handleChange}
                      >
                        <option value="">Chọn phương thức thanh toán</option>
                        <option value="VN_PAY">VNPay</option>
                        <option value="COD">Thanh toán khi nhận hàng</option>
                      </select>
                      {formik.errors.paymentMethod &&
                        formik.touched.paymentMethod && (
                          <div className="error">
                            {formik.errors.paymentMethod}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="content-checkout-tbl-right">
                    <div>
                      <select
                        id="city"
                        name="cusCityCode"
                        value={formik.values.cusCityCode}
                        onChange={handleCityChange}
                      >
                        <option value="">Chọn Tỉnh / Thành Phố</option>
                        {cities?.map((item) => (
                          <option key={item.CityID} value={item.CityID}>
                            {item.CityName}
                          </option>
                        ))}
                      </select>
                      {formik.errors.cusCityCode &&
                        formik.touched.cusCityCode && (
                          <div className="error">
                            {formik.errors.cusCityCode}
                          </div>
                        )}
                    </div>
                    <div>
                      <select
                        id="district"
                        name="cusDistrictId"
                        value={formik.values.cusDistrictId}
                        onChange={handleDistrictChange}
                      >
                        <option value="">Chọn Quận / Huyện</option>
                        {districts?.map((item) => (
                          <option key={item.DistrictID} value={item.DistrictID}>
                            {item.DistrictName}
                          </option>
                        ))}
                      </select>
                      {formik.errors.cusDistrictId &&
                        formik.touched.cusDistrictId && (
                          <div className="error">
                            {formik.errors.cusDistrictId}
                          </div>
                        )}
                    </div>
                    <div>
                      <select
                        id="ward"
                        name="cusWardCode"
                        value={formik.values.cusWardCode}
                        onChange={formik.handleChange}
                      >
                        <option value="">Chọn Phường / Xã</option>
                        {wards?.map((item) => (
                          <option key={item.WardCode} value={item.WardCode}>
                            {item.WardName}
                          </option>
                        ))}
                      </select>
                      {formik.errors.cusWardCode &&
                        formik.touched.cusWardCode && (
                          <div className="error">
                            {formik.errors.cusWardCode}
                          </div>
                        )}
                    </div>
                    <div>
                      <input
                        placeholder="Số nhà, tên đường (tự ghi)"
                        name="cusStreet"
                        value={formik.values.cusStreet}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.cusStreet && formik.touched.cusStreet && (
                        <div className="error">{formik.errors.cusStreet}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="content-checkout-product-list">
                  <div className="content-checkout-product-list-left">
                    {cartItems.map((item) => (
                      <div
                        className="content-checkout-product-item"
                        key={item.productId}
                      >
                        <div
                          style={{
                            width: "50%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: "bold",
                            backgroundColor: "rgba(255, 197, 226, 0.538)",
                            borderRadius: "10px",
                            paddingTop: "10px",
                            paddingLeft: "5px",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            width: "20%",
                            paddingTop: "10px",
                            textAlign: "center",
                          }}
                        >
                          {formatPrice(item.sellingPrice)}đ
                        </div>
                        <span style={{ paddingTop: "10px" }}>x</span>
                        <div
                          style={{
                            width: "7%",
                            paddingTop: "10px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </div>{" "}
                        <span style={{ paddingTop: "10px" }}> = </span>
                        <div
                          style={{
                            width: "20%",
                            paddingTop: "10px",
                            textAlign: "center",
                          }}
                        >
                          {formatPrice(item.sellingPrice * item.quantity)}đ
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="content-checkout-product-list-right">
                    <div className="content-checkout-product-list-right-total">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "35px",
                          width: "100%",
                        }}
                      >
                        <b>Tổng tiền hàng:</b>
                        <span>{formatPrice(evaluateResult.basePrice)}đ</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "35px",
                          width: "100%",
                        }}
                      >
                        <b>Tổng phí giao hàng:</b>
                        <span>{formatPrice(evaluateResult.shippingFee)}đ</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "35px",
                          width: "100%",
                          borderBottom: "1px solid #7c7c7caa",
                        }}
                      >
                        <b>Giảm giá:</b>
                        <span>
                          -
                          {formatPrice(
                            evaluateResult.basePrice +
                              evaluateResult.shippingFee -
                              evaluateResult.postDiscountPrice
                          )}
                          đ
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "35px",
                          width: "100%",
                        }}
                      >
                        <b>Tổng thanh toán:</b>
                        <span>
                          {formatPrice(evaluateResult.postDiscountPrice)}đ
                        </span>
                      </div>
                    </div>
                    <div className="content-checkout-product-list-right-btn">
                      {localStorage.getItem("token") ? (
                        <button
                          type="button"
                          onClick={handleVoucherClick}
                          style={{
                            width: "45%",
                            height: "50px",
                            color: "#ff469e",
                            border: "3px solid #ff469e",
                            backgroundColor: "rgb(255, 232, 243)",
                            borderRadius: "10px",
                            fontSize: "17px",
                            fontWeight: "550",
                            marginRight: "12px",
                          }}
                        >
                          Voucher
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: "45%",
                          height: "50px",
                          color: "white",
                          border: "none",
                          backgroundColor: "#ff469e",
                          borderRadius: "10px",
                          fontSize: "17px",
                          fontWeight: "550",
                          float: "right",
                        }}
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CustomDialog
        open={openVoucherDialog}
        onClose={() => handleCloseVoucherDialog(formik.values.voucherId)}
      >
        <CustomDialogTitle>Mã giảm giá</CustomDialogTitle>
        <DialogContent>
          <VoucherPresentation
            initialVoucherId={formik.values.voucherId}
            basePrice={evaluateResult.basePrice}
            handleClose={handleCloseVoucherDialog}
          />
        </DialogContent>
      </CustomDialog>
    </div>
  );
}
