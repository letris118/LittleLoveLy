import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import "../assets/css/checkout.css";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("username")}
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
                      <input placeholder="Tên nhận hàng" />
                    </div>
                    <div>
                      <input placeholder="Số điện thoại" />
                    </div>
                    <div>
                      <input placeholder="Gmail" />
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
                      <select id="province" name="province" required>
                        <option value="">Chọn tỉnh / thành phố</option>
                      </select>
                    </div>
                    <div>
                      <select id="district" name="district" required>
                        <option value="">Chọn quận / huyện</option>
                      </select>
                    </div>
                    <div>
                      <select id="ward" name="ward" required>
                        <option value="">Chọn phường xã</option>
                      </select>
                    </div>
                    <div>
                      <input placeholder="Số nhà, tên đường (tự ghi)" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
