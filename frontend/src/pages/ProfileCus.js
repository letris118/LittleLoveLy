import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/profileCus.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { routes } from "../routes";
import {
  getCities,
  getDistrictByCityId,
  getUserInfo,
  getWardByDistrictId,
  updateUserInfo,
} from "../services/auth/UsersService";
import { toast } from "react-toastify";
export default function ProfileCus() {
  const navigate = useNavigate();
  const [cusInfo, setCusInfo] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [openVoucherDialog, setOpenVoucherDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [openChangeGmailDialog, setOpenChangeGmailDialog] = useState(false);

  console.log(districts, wards);
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      cityId: "",
      districtId: "",
      wardId: "",
      street: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const username = localStorage.getItem("username");
        await updateUserInfo(
          username,
          "",
          values.name.toString(),
          cusInfo.mail,
          values.phone,
          values.cityId,
          values.districtId,
          values.wardId,
          values.street
        );
        toast.success("Cập nhật thông tin thành công ");
        setOpenVoucherDialog(false);
      } catch (error) {
        console.error("Failed to update user info:", error);
      }
    },
  });

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "ROLE_CUSTOMER") {
      navigate(routes.homePage);
    }

    const fetchUser = async () => {
      try {
        const res = await getUserInfo(localStorage.getItem("username"));
        setCusInfo(res);
        formik.setValues({
          name: res.name || "",
          phone: res.phone || "",
          cityId: res.cityCode || "",
          districtId: res.districtId || "",
          wardId: res.wardCode || "",
          street: res.street || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCities = async () => {
      try {
        const res = await getCities();
        setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    fetchCities();
  }, [navigate]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        if (formik.values.cityId) {
          const res = await getDistrictByCityId(formik.values.cityId);
          setDistricts(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (formik.values.cityId) {
      fetchDistricts();
    }
  }, [formik.values.cityId]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        if (formik.values.districtId) {
          const res = await getWardByDistrictId(formik.values.districtId);
          setWards(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (formik.values.districtId) {
      fetchWards();
    }
  }, [formik.values.districtId]);

  const CustomButton = styled(Button)({
    background: "#FF469E",
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold",
    width: "200px",
    padding: "10px 20px",
    textTransform: "none",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(255,0,132,0.8) 0%, rgba(255,99,132,0.8) 100%)",
    },
  });

  const CustomDialog = styled(Dialog)({
    "& .MuiDialog-paper": {
      width: "50%",
      height: "auto",
    },
    "& .MuiPaper-root": {
      borderRadius: "20px",
    },
  });

  const handleAdjustClick = () => {
    setOpenVoucherDialog(true);
  };

  const handleCloseAdjustDialog = () => {
    setOpenVoucherDialog(false);
  };

  const handleOpenChangePassword = () => {
    setOpenChangePasswordDialog(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePasswordDialog(false);
  };

  const handleOpenChangeGmail = () => {
    setOpenChangeGmailDialog(true);
  };

  const handleCloseChangeGmail = () => {
    setOpenChangeGmailDialog(false);
  };

  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      height: "56px",
      paddingLeft: "20px",
    },
  });

  const CustomDialogTitle = styled(DialogTitle)({
    fontWeight: "bold",
    backgroundColor: "#ff469e",
    color: "white",
    marginBottom: "20px",
  });

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    formik.setFieldValue("cityId", cityId);
    formik.setFieldValue("districtId", "");
    formik.setFieldValue("wardId", "");
    formik.setFieldValue("street", "");
    if (cityId) {
      const res = await getDistrictByCityId(cityId);
      setDistricts(res.data);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    formik.setFieldValue("districtId", districtId);
    formik.setFieldValue("wardId", "");
    formik.setFieldValue("street", "");
    if (districtId) {
      const res = await getWardByDistrictId(districtId);
      setWards(res.data);
    } else {
      setWards([]);
    }
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
          <div className="content-display ">
            <div className="profile-content-tbl">
              <div className="row-top">
                <h4>Thông tin cá nhân</h4>
              </div>
              <div className="profile-content-detail">
                <div className="profile-content-detail-description">
                  <div className="profile-content-detail-description-item">
                    <h5>Tên: </h5>
                    <div>{cusInfo.name}</div>
                  </div>
                  <div className="profile-content-detail-description-item">
                    <h5>Gmail: </h5>
                    <div>{cusInfo.mail}</div>
                  </div>
                  <div className="profile-content-detail-description-item">
                    <h5>Số điện thoại: </h5>
                    <div>{cusInfo.phone}</div>
                  </div>
                  <div className="profile-content-detail-description-item">
                    <h5>Địa chỉ mặc định: </h5>
                    <div>
                      {cusInfo.street ||
                      cusInfo.cityCode ||
                      cusInfo.districtId ||
                      cusInfo.wardCode ? (
                        <>
                          {cusInfo.street},
                          {
                            cities.find(
                              (city) => city.CityID === cusInfo.cityCode
                            )?.CityName
                          }
                          ,
                          {
                            districts.find(
                              (district) =>
                                district.DistrictID === cusInfo.districtId
                            )?.DistrictName
                          }
                          ,
                          {
                            wards.find(
                              (ward) => ward.WardID === cusInfo.wardCode
                            )?.WardName
                          }
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-adjust">
                <CustomButton onClick={handleAdjustClick}>
                  Sửa thông tin cá nhân
                </CustomButton>
                <CustomButton onClick={handleOpenChangePassword}>
                  Đổi mật khẩu
                </CustomButton>
                <CustomButton onClick={handleOpenChangeGmail}>
                  Đổi gmail
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CustomDialog open={openVoucherDialog} onClose={handleCloseAdjustDialog}>
        <CustomDialogTitle>Thay đổi thông tin</CustomDialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <CustomTextField
                label="Tên"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
                sx={{ marginBottom: "20px" }}
              />
            </div>
            <div>
              <CustomTextField
                label="Số điện thoại"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <TextField
                select
                name="cityId"
                value={formik.values.cityId}
                onChange={handleCityChange}
                fullWidth
                SelectProps={{ native: true }}
                margin="normal">
                <option value="">Chọn Tỉnh / Thành Phố</option>
                {cities.map((item) => (
                  <option key={item.CityID} value={item.CityID}>
                    {item.CityName}
                  </option>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                select
                name="districtId"
                value={formik.values.districtId}
                onChange={handleDistrictChange}
                fullWidth
                SelectProps={{ native: true }}
                margin="normal">
                <option value="">Chọn Quận / Huyện</option>
                {districts.map((item) => (
                  <option key={item.DistrictID} value={item.DistrictID}>
                    {item.DistrictName}
                  </option>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                select
                name="wardId"
                value={formik.values.wardId}
                onChange={formik.handleChange}
                fullWidth
                SelectProps={{ native: true }}
                margin="normal">
                <option value="">Chọn Phường / Xã</option>
                {wards.map((item) => (
                  <option key={item.WardID} value={item.WardID}>
                    {item.WardName}
                  </option>
                ))}
              </TextField>
            </div>
            <div>
              <CustomTextField
                label="Số nhà, tên đường"
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <DialogActions>
              <CustomButton type="submit">Cập nhật</CustomButton>
              <CustomButton onClick={handleCloseAdjustDialog}>
                Close
              </CustomButton>
            </DialogActions>
          </form>
        </DialogContent>
      </CustomDialog>
      <CustomDialog
        open={openChangePasswordDialog}
        onClose={handleCloseChangePassword}>
        <CustomDialogTitle>Đổi mật khẩu</CustomDialogTitle>
        <DialogContent>
          <form>
            <div>
              <CustomTextField
                label="Mật khẩu hiện tại "
                name="currentPassword"
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <CustomTextField
                label="Mật khẩu mới"
                name="newPassword"
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <CustomTextField
                label="Xác nhận mật khẩu mới"
                name="confirmNewPassword"
                onChange={handleCityChange}
                fullWidth
                SelectProps={{ native: true }}
                margin="normal"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>   
          <CustomButton type="submit">Đổi</CustomButton>
          <CustomButton onClick={handleCloseChangePassword}>Close</CustomButton>
        </DialogActions>
      </CustomDialog>
      <CustomDialog
        open={openChangeGmailDialog}
        onClose={handleCloseChangeGmail}>
        <CustomDialogTitle>Đổi gmail</CustomDialogTitle>
        <DialogContent>
          <div>
            <CustomTextField
              label="Nhập gmail"
              name="currentGmail"
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <CustomButton type="submit">Đổi</CustomButton>
          <CustomButton onClick={handleCloseChangeGmail}>Close</CustomButton>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}
