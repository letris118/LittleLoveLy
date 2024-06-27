import React from "react";
import "../assets/css/footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-8 footer-column">
              <h5>Về chúng tôi</h5>
              <p>
                Chúng tôi cung cấp những sản phẩm tốt nhất cho mẹ và bé. Sứ mệnh
                của chúng tôi là mang đến những sản phẩm chất lượng cao, an toàn
                và giá cả phải chăng cho gia đình bạn.
              </p>
            </div>
            <div className="col-md-4 footer-column">
              <h5>Liên hệ</h5>
              <p>
                <b>Email:</b> support@momandbabyshop.com
              </p>
              <p>
                <b>Số điện thoại:</b> +123-456-7890
              </p>
            </div>
          </div>
          <div className="footer-bottom mt-3">
            &copy; 2024 Mom and Baby Shop.
          </div>
        </div>
      </footer>
    </div>
  );
}
