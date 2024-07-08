import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { toast } from "react-toastify";
import { addStaff } from "../services/auth/UsersService";
import AdminSideBar from "../components/AdminSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";

export default function AddStaff() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_ADMIN") {
        navigate('/');
      }
    };
    checkAuthentication();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Xác nhận mật khẩu thất bại!");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }
    try {
      await addStaff(username, name, mail, phone, password);
      toast.success("Thêm nhân viên thành công!");
      navigate('/manageStaff'); 
    } catch (error) {
      toast.error("Tài khoản đã tồn tại!");
      console.error("Error adding staff:", error);
    }
  };
  

  return (
    <div>
      <AdminHeader />
      <div className="manage-content">
        <AdminSideBar />
        <div className="add-update-content-detail">
          <form onSubmit={handleSubmit}>
            <div className="manage-form-input">

              {/* USERNAME */}
              <div className="manage-form-group">
                <label>Tên tài khoản</label>
                <div className="manage-form-control">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* NAME */}
              <div className="manage-form-group">
                <label>Tên đầy đủ:</label>
                <div className="manage-form-control">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* MAIL */}
              <div className="manage-form-group">
                <label>Gmail</label>
                <div className="manage-form-control">
                  <input
                    type="email"
                    name="mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="manage-form-group">
                <label>Số điện thoại</label>
                <div className="manage-form-control">
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="manage-form-group">
                <label>Mật khẩu</label>
                <div className="manage-form-control">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="manage-form-group">
                <label>Xác nhận mật khẩu</label>
                <div className="manage-form-control">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="manage-form-btn">
              <button className="save-manage-btn save-manage-link" type="submit">
                Thêm nhân viên
              </button>
              <div className="cancel-manage-btn">
                <button
                  type="button"
                  className="cancel-manage-link"
                  onClick={() => {
                    setUsername("");
                    setName("");
                    setMail("");
                    setPhone("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Đặt lại
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
