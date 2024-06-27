import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import "../assets/css/checkout.css";
import { formatPrice } from "../services/auth/UsersService";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);

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
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
    } else {
      setDistricts([]);
    }
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
    } else {
      setWards([]);
    }
  }, [selectedProvince, selectedDistrict]);
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

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
              <form>
                <div className="content-checkout-tbl">
                  <div className="content-checkout-tbl-left">
                    <div>
                      <input type="text" placeholder="Tên nhận hàng" />
                    </div>
                    <div>
                      <input type="text" placeholder="Số điện thoại" />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Gmail"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Nhập đúng định dạng mail"
                      />
                    </div>
                    <div className="content-checkout-tbl-left-method-payment">
                      <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}>
                        <option value="">Chọn phương thức thanh toán</option>
                        <option value="vnpay">VNPay</option>
                        <option value="cod">Thanh toán khi nhận hàng</option>
                      </select>
                    </div>
                  </div>
                  <div className="content-checkout-tbl-right">
                    <div>
                      <select
                        id="city"
                        name="city"
                        required
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}>
                        <option value="">Chọn Tỉnh / Thành Phố</option>
                        {cities.map((item) => (
                          <option key={item.CityID} value={item.CityID}>
                            {item.CityName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        id="district"
                        name="district"
                        required
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}>
                        <option value="">Chọn Quận / Huyện</option>
                        {districts.map((item) => (
                          <option key={item.DistrictID} value={item.DistrictID}>
                            {item.DistrictName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select id="ward" name="ward" required>
                        <option value="">Chọn Phường / Xã</option>
                        {wards.map((item) => (
                          <option key={item.WardID} value={item.WardID}>
                            {item.WardName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input placeholder="Số nhà, tên đường (tự ghi)" />
                    </div>
                  </div>
                </div>
                <div className="content-checkout-product-list">
                  <div className="content-checkout-product-list-left">
                    {cartItems.map((item) => (
                      <div
                        className="content-checkout-product-item"
                        key={item.productId}>
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
                          }}>
                          {item.name}
                        </div>
                        <div
                          style={{
                            width: "20%",
                            paddingTop: "10px",
                            textAlign: "center",
                          }}>
                          {formatPrice(item.sellingPrice)}đ
                        </div>
                        <span style={{ paddingTop: "10px" }}>x</span>
                        <div
                          style={{
                            width: "7%",
                            paddingTop: "10px",
                            textAlign: "center",
                          }}>
                          {item.quantity}
                        </div>{" "}
                        <span style={{ paddingTop: "10px" }}> = </span>
                        <div
                          style={{
                            width: "20%",
                            paddingTop: "10px",
                            textAlign: "center",
                          }}>
                          {formatPrice(item.sellingPrice * item.quantity)}đ
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="content-checkout-product-list-right">
                    <div className="content-checkout-product-list-right-total">
                      {cartItems.map((item) => (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              height: "50px",
                              width: "100%",
                            }}>
                            <b>Phí giao hàng:</b>
                            <span>
                              {formatPrice(item.sellingPrice * item.quantity)}đ
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              height: "50px",
                              width: "100%",
                            }}>
                            <b>Giảm giá vận chuyển:</b>
                            <span>-{formatPrice(2000)}đ</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              height: "50px",
                              width: "100%",
                              borderBottom: "1px solid #7c7c7caa",
                            }}>
                            <b>Tổng tiền:</b>
                            <span>
                              {formatPrice(
                                item.sellingPrice * item.quantity - 2000
                              )}
                              đ
                            </span>
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="content-checkout-product-list-right-btn">
                      <Link>
                        <button
                          style={{
                            width: "48%",
                            height: "50px",
                            color: "#ff469e",
                            border: "3px solid #ff469e",
                            backgroundColor: "rgb(255, 232, 243)",
                            borderRadius: "10px",
                            fontSize: "17px",
                            fontWeight: "550",
                            marginRight: "12px",
                          }}>
                          Voucher
                        </button>
                      </Link>
                      <Link>
                        <button
                          style={{
                            width: "48%",
                            height: "50px",
                            color: "white",
                            border: "none",
                            backgroundColor: "#ff469e",
                            borderRadius: "10px",
                            fontSize: "17px",
                            fontWeight: "550",
                            float: "right",
                          }}>
                          Mua ngay
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
