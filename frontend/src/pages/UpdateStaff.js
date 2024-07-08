import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { toast } from "react-toastify";
import { getUserInfo, updateStaff } from "../services/auth/UsersService";
import AdminSideBar from "../components/AdminSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";

export default function UpdateStaff() {
  const navigate = useNavigate();
  const { username } = useParams();  

  const [staff, setStaff] = useState({});

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_ADMIN") {
        navigate('/');
      }
    };
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getUserInfo(username);
        if (response) {
          setStaff(response);
        } else {
          toast.error("Không tìm thấy thông tin nhân viên.");
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
        toast.error("Không thể tải thông tin nhân viên.");
      }
    };

    fetchStaff();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // formData.append('username', staff.username);
    const updatedStaff = {
      username: staff.username,
      name: formData.get('name'),
      mail: formData.get('mail'),
      phone: formData.get('phone'),
    };

    try {
      await updateStaff(staff.username, updatedStaff);
      
      toast.success("Cập nhật thông tin thành công!");
      navigate('/manage-staff');
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error(`Lỗi khi cập nhật thông tin: ${error.message}`);
    }
  };

  const handleReload = (e) => {
    e.preventDefault();
    window.location.reload();
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
                    value={staff.username || ""}
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
                    defaultValue={staff.name || ""}
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
                    defaultValue={staff.mail || ""}
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
                    defaultValue={staff.phone || ""}
                    required
                  />
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="manage-form-btn">
              <button className="save-manage-btn save-manage-link" type="submit">
                Lưu thông tin
              </button>
              <div className="cancel-manage-btn">
                <button onClick={handleReload} className="cancel-manage-link">
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

