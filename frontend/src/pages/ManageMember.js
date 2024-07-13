import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/homePage.css";
import {
  getUsersByRoleAll,
  getCities,
  getDistrictByCityId,
  getWardByDistrictId,
} from "../services/auth/UsersService";
import AdminSideBar from "../components/AdminSideBar";
import StaffBackToTop from "../components/StaffBackToTop";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  styled,
} from "@mui/material";

export default function ManageMember() {
  const [customerList, setCustomerList] = useState([]);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cusInfo, setCusInfo] = useState({});
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_ADMIN") {
        navigate("/");
      }
    };
    checkAuthentication();

    const fetchCustomers = async () => {
      try {
        let response = await getUsersByRoleAll("ROLE_CUSTOMER");
        if (response) {
          setCustomerList(response);
          setFilteredCustomerList(response);
        } else {
          setCustomerList([]);
          setFilteredCustomerList([]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải khách hàng!");
        setCustomerList([]);
        setFilteredCustomerList([]);
      }
    };

    const fetchCities = async () => {
      try {
        const res = await getCities();
        setCities(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Không thể lấy danh sách thành phố!");
      }
    };

    fetchCities();
    fetchCustomers();
  }, [navigate]);

  const CustomDialog = styled(Dialog)({
    "& .MuiDialog-paper": {
      width: "50%",
      height: "auto",
    },
    "& .MuiPaper-root": {
      borderRadius: "20px",
    },
  });

  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      height: "56px",
      paddingLeft: "20px",
    },
  });

  const CustomButton = styled(Button)({
    background: "#ccc",
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold",
    width: "150px",
    padding: "10px 20px",
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(90deg, #2d3436 0%, #2d3436 100%)",
    },
  });

  const handleOpenInfoDialog = (customer) => {
    const fetchData = async () => {
      try {
        setCusInfo(customer);
        const [districtRes, wardRes] = await Promise.all([
          getDistrictByCityId(customer.cityCode),
          getWardByDistrictId(customer.districtId),
        ]);
        setDistricts(districtRes.data);
        setWards(wardRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
      }
    };
    fetchData().then(() => {
      setOpenInfoDialog(true);
    });
  };

  const handleCloseInfoDialog = () => {
    setOpenInfoDialog(false);
  };

  const InfoForm = ({ handleClose }) => {
    return (
      <form>
        <div>
          <CustomTextField
            label="Tỉnh / Thành Phố"
            value={
              cities.find(
                (city) => city.CityID === cusInfo.cityCode?.toString()
              )?.CityName
            }
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <CustomTextField
            label="Quận / Huyện"
            value={
              districts.find(
                (district) =>
                  district.DistrictID === cusInfo.districtId?.toString()
              )?.DistrictName
            }
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <CustomTextField
            label="Phường / Xã"
            value={
              wards.find(
                (ward) => ward.WardCode === cusInfo.wardCode?.toString()
              )?.WardName
            }
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <CustomTextField
            label="Số nhà, tên đường"
            value={cusInfo.street}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <DialogActions>
          <CustomButton onClick={handleClose}>Đóng</CustomButton>
        </DialogActions>
      </form>
    );
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredCustomerList(customerList);
    } else {
      setFilteredCustomerList(
        customerList.filter((customer) =>
          customer.username.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="manage-content">
        <AdminSideBar />

        <div className="manage-content-detail">
          <div className="search-add-table">
            <div className="table-search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <table className="manage-table-none">
            <thead className="manage-table-head">
              <tr>
                <th className="index-head" style={{ width: "5%" }}>
                  STT
                </th>
                <th className="name-head" style={{ width: "19%" }}>
                  Họ và tên
                </th>
                <th className="usernam-head" style={{ width: "15%" }}>
                  Tên tài khoản
                </th>
                <th className="mail-head" style={{ width: "18%" }}>
                  Gmail
                </th>
                <th className="phone-head" style={{ width: "12%" }}>
                  Số điện thoại
                </th>
                <th className="point-head" style={{ width: "8%" }}>
                  Điểm
                </th>
                <th className="regisDate-head" style={{ width: "12%" }}>
                  Ngày đăng kí
                </th>
                <th className="detail-head" style={{ width: "10%" }}>
                  Địa chỉ
                </th>
              </tr>
            </thead>

            <tbody className="manage-table-body">
              {filteredCustomerList.length > 0 ? (
                filteredCustomerList.map((customer, index) => (
                  <tr key={index}>
                    <td className="index-body">{index + 1}</td>
                    <td className="name-body">{customer.name}</td>
                    <td className="username-body">{customer.username}</td>
                    <td className="mail-body">{customer.mail}</td>
                    <td className="phone-body">{customer.phone}</td>
                    <td className="point-body">{customer.point}</td>
                    <td className="regisDate-body">
                      {customer.registeredDate}
                    </td>
                    <td className="update-body">
                      <Link
                        className="update-link"
                        onClick={() => handleOpenInfoDialog(customer)}
                      >
                        Xem
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Không có khách hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <StaffBackToTop />

      <CustomDialog open={openInfoDialog} onClose={handleCloseInfoDialog}>
        <DialogTitle className="manage-dialog-title">
          Địa Chỉ Mặc Định
        </DialogTitle>
        <DialogContent>
          <InfoForm handleClose={handleCloseInfoDialog} />
        </DialogContent>
      </CustomDialog>
    </div>
  );
}
