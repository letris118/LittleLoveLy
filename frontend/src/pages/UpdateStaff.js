import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { toast } from "react-toastify";
import { getUserInfo, updateStaff } from "../services/auth/UsersService";
import AdminSideBar from "../components/AdminSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";

export default function UpdateStaff() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    username: "",
    name: "",
    mail: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_ADMIN") {
        navigate('/');
      }
    };
    checkAuthentication();

    const fetchStaff = async () => {
      try {
        const response = await getUserInfo(username);
        if (response) {
          setStaff(response);
        } else {
          toast.error("Không tìm thấy thông tin nhân viên.");
          navigate('/manageStaff');
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
        toast.error("Không thể tải thông tin nhân viên.");
        navigate('/manageStaff');
      }
    };

    fetchStaff();
  }, [username, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (staff.password !== staff.confirmPassword) {
      toast.error("Xác nhận mật khẩu thất bại!");
      return;
    }
    try {
      await updateStaff(staff);
      toast.success("Cập nhật thông tin nhân viên thành công!");
      navigate('/manageStaff');
    } catch (error) {
      toast.error("Lỗi khi cập nhật thông tin nhân viên.");
      console.error("Error updating staff:", error);
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
                    value={staff.username}
                    disabled
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
                    value={staff.name}
                    onChange={handleChange}
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
                    value={staff.mail}
                    onChange={handleChange}
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
                    value={staff.phone}
                    onChange={handleChange}
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
                    value={staff.password}
                    onChange={handleChange}
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
                    value={staff.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="manage-form-btn">
              <button className="save-manage-btn save-manage-link" type="submit">
                Cập nhật thông tin nhân viên
              </button>
              <div className="cancel-manage-btn">
                <button
                  type="button"
                  className="cancel-manage-link"
                  
                >
                  Hủy bỏ
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
