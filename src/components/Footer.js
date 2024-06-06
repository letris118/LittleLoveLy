import React from "react";
import "../assets/css/footer.css";

export default function Footer() {
  return (
    <div>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-md-8 footer-column">
              <h5>Về chúng tôi</h5>
              <p>
                Chúng tôi cung cấp những sản phẩm tốt nhất cho mẹ và bé. Sứ mệnh
                của chúng tôi là mang đến những sản phẩm chất lượng cao, an toàn
                và giá cả phải chăng cho gia đình bạn.
              </p>
            </div>
            <div class="col-md-4 footer-column">
              <h5>Liên hệ</h5>
              <p>
                <b>Email:</b> support@momandbabyshop.com
              </p>
              <p>
                <b>Số điện thoại:</b> +123-456-7890
              </p>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010537022!2d106.80730807480579!3d10.841127589311634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1717681243006!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="footer-bottom mt-3">&copy; 2024 Mom and Baby Shop.</div>
        </div>
      </footer>
    </div>
  );
}
