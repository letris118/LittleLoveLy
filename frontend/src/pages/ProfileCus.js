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
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  changePasswordAPI,
  changeMailAPI,
} from "../services/auth/UsersService";
import { toast } from "react-toastify";
import * as Yup from "yup";
export default function ProfileCus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cusInfo, setCusInfo] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [openChangeGmailDialog, setOpenChangeGmailDialog] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (userRole !== "ROLE_CUSTOMER") {
        navigate("/");
      }
    };
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const msg = queryParams.get("msg");
    if (msg === "mail-changed") {
      toast.success("Mail đã được thay đổi thành công");
    }
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "ROLE_CUSTOMER") {
      navigate(routes.homePage);
    }

    const fetchUser = async () => {
      try {
        const res = await getUserInfo(localStorage.getItem("username"));
        setCusInfo(res);
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
  }, [navigate, refresh]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        if (cusInfo.cityCode) {
          const res = await getDistrictByCityId(cusInfo.cityCode);
          setDistricts(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDistricts();
  }, [cusInfo.cityCode]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        if (cusInfo.districtId) {
          const res = await getWardByDistrictId(cusInfo.districtId);
          setWards(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchWards();
  }, [cusInfo.districtId]);

  const CustomDialog = styled(Dialog)({
    "& .MuiDialog-paper": {
      width: "50%",
      height: "auto",
    },
    "& .MuiPaper-root": {
      borderRadius: "20px",
    },
  });

  const CustomDialogTitle = styled(DialogTitle)({
    fontWeight: "bold",
    backgroundColor: "#ff469e",
    color: "white",
    marginBottom: "20px",
  });

  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      height: "56px",
      paddingLeft: "20px",
    },
  });

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

  const handleOpenInfoDialog = () => {
    setOpenInfoDialog(true);
  };

  const handleCloseInfoDialog = () => {
    setOpenInfoDialog(false);
  };

  const handleOpenChangePassword = useCallback(() => {
    setOpenChangePasswordDialog(true);
  }, []);

  const handleCloseChangePassword = useCallback(() => {
    setOpenChangePasswordDialog(false);
  }, []);

  const handleOpenChangeGmail = useCallback(() => {
    setOpenChangeGmailDialog(true);
  }, []);

  const handleCloseChangeGmail = useCallback(() => {
    setOpenChangeGmailDialog(false);
  }, []);

  const InfoForm = ({ handleClose }) => {
    const [localDistricts, setLocalDistricts] = useState(districts);
    const [localWards, setLocalWards] = useState(wards);

    const validationSchema = Yup.object({
      name: Yup.string().required("Vui lòng điền đầy đủ thông tin"),
      phone: Yup.string()
        .required("Vui lòng điền đầy đủ thông tin")
        .matches(/^\d+$/, "Số điện thoại không hợp lệ"),
      cityId: Yup.string().required("Vui lòng điền đầy đủ thông tin"),
      districtId: Yup.string().required("Vui lòng điền đầy đủ thông tin"),
      wardId: Yup.string().required("Vui lòng điền đầy đủ thông tin"),
      street: Yup.string().required("Vui lòng điền đầy đủ thông tin"),
    });

    const formik = useFormik({
      initialValues: {
        name: cusInfo.name || "",
        phone: cusInfo.phone || "",
        cityId: cusInfo.cityCode || "",
        districtId: cusInfo.districtId || "",
        wardId: cusInfo.wardCode || "",
        street: cusInfo.street || "",
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          const username = localStorage.getItem("username");
          if (
            await updateUserInfo(
              username,
              values.name.toString(),
              values.phone,
              values.cityId,
              values.districtId,
              values.wardId,
              values.street
            )
          ) {
            toast.success("Cập nhật thông tin thành công ");
            handleClose();
            setRefresh(!refresh);
          }
        } catch (error) {
          console.error("Failed to update user info:", error);
          if (
            error.response.data &&
            error.response.data.includes("Cannot insert duplicate key row")
          ) {
            toast.error("Số điện thoại đã được sử dụng.");
          } else {
            toast.error("Cập nhật thông tin thất bại");
          }
        }
      },
    });

    const handleCityChange = async (e) => {
      const cityId = e.target.value;
      formik.setFieldValue("cityId", cityId);
      formik.setFieldValue("districtId", "");
      formik.setFieldValue("wardId", "");
      formik.setFieldValue("street", "");
      if (cityId) {
        const res = await getDistrictByCityId(cityId);
        setLocalDistricts(res.data);
        setLocalWards([]);
      } else {
        setLocalDistricts([]);
        setLocalWards([]);
      }
    };

    const handleDistrictChange = async (e) => {
      const districtId = e.target.value;
      formik.setFieldValue("districtId", districtId);
      formik.setFieldValue("wardId", "");
      formik.setFieldValue("street", "");
      if (districtId) {
        const res = await getWardByDistrictId(districtId);
        setLocalWards(res.data);
      } else {
        setLocalWards([]);
      }
    };

    return (
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
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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
            margin="normal"
            error={formik.touched.cityId && Boolean(formik.errors.cityId)}
            helperText={formik.touched.cityId && formik.errors.cityId}>
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
            margin="normal"
            error={
              formik.touched.districtId && Boolean(formik.errors.districtId)
            }
            helperText={formik.touched.districtId && formik.errors.districtId}>
            <option value="">Chọn Quận / Huyện</option>
            {localDistricts.map((item) => (
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
            margin="normal"
            error={formik.touched.wardId && Boolean(formik.errors.wardId)}
            helperText={formik.touched.wardId && formik.errors.wardId}>
            <option value="">Chọn Phường / Xã</option>
            {localWards.map((item) => (
              <option key={item.WardCode} value={item.WardCode}>
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
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />
        </div>
        <DialogActions>
          <CustomButton type="submit">Cập nhật</CustomButton>
          <CustomButton onClick={handleClose}>Đóng</CustomButton>
        </DialogActions>
      </form>
    );
  };

  const PasswordForm = ({ handleClose }) => {
    const validationSchema = Yup.object({
      currentPassword: Yup.string().required("Vui lòng điền mật khẩu hiện tại"),
      newPassword: Yup.string().required(
        "Vui lòng điền mật khẩu mong muốn đổi"
      ),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Xác nhận mật này không đúng")
        .required("Vui lòng xác nhận mật khẩu mong muốn đổi"),
    });

    const formik = useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          if (
            await changePasswordAPI(values.currentPassword, values.newPassword)
          ) {
            toast.success("Đổi mật khẩu thành công");
            handleClose();
          }
        } catch (error) {
          console.error("Failed to change password:", error);
          if (
            error.response &&
            error.response.data === "Incorrect current password"
          ) {
            toast.error("Mật khẩu hiện tại không đúng");
          } else {
            toast.error("Đổi mật khẩu thất bại");
          }
        }
      },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <div>
          <CustomTextField
            label="Mật khẩu hiện tại *"
            name="currentPassword"
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
        </div>
        <div>
          <CustomTextField
            label="Mật khẩu mới *"
            name="newPassword"
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </div>
        <div>
          <CustomTextField
            label="Xác nhận mật khẩu mới *"
            name="confirmNewPassword"
            onChange={formik.handleChange}
            fullWidth
            SelectProps={{ native: true }}
            margin="normal"
            error={
              formik.touched.confirmNewPassword &&
              Boolean(formik.errors.confirmNewPassword)
            }
            helperText={
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
            }
          />
        </div>
        <DialogActions>
          <CustomButton type="submit">Đổi</CustomButton>
          <CustomButton onClick={handleClose}>Đóng</CustomButton>
        </DialogActions>
      </form>
    );
  };

  const MailForm = ({ handleClose }) => {
    const validationSchema = Yup.object({
      newMail: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng điền email"),
    });

    const formik = useFormik({
      initialValues: {
        newMail: "",
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          if (await changeMailAPI(values.newMail)) {
            toast.success("Kiểm tra mail mới của bạn để xác nhận");
            handleClose();
          }
        } catch (error) {
          console.error("Failed to change mail:", error);
          if (error.response && error.response.data === "Mail already exists") {
            toast.error("Mail này đã được sử dụng");
          } else {
            toast.error("Đổi mail thất bại");
          }
        }
      },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <div>
          <CustomTextField
            label="Nhập email bạn muốn thay đổi"
            name="newMail"
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
            error={formik.touched.newMail && Boolean(formik.errors.newMail)}
            helperText={formik.touched.newMail && formik.errors.newMail}
          />
        </div>
        <DialogActions>
          <CustomButton type="submit">Đổi</CustomButton>
          <CustomButton onClick={handleClose}>Đóng</CustomButton>
        </DialogActions>
      </form>
    );
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
                          {[
                            cusInfo.street,
                            wards.find(
                              (ward) =>
                                ward.WardCode === cusInfo.wardCode?.toString()
                            )?.WardName,
                            districts.find(
                              (district) =>
                                district.DistrictID ===
                                cusInfo.districtId?.toString()
                            )?.DistrictName,
                            cities.find(
                              (city) =>
                                city.CityID === cusInfo.cityCode?.toString()
                            )?.CityName,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-adjust">
                <CustomButton onClick={handleOpenInfoDialog}>
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
      <CustomDialog open={openInfoDialog} onClose={handleCloseInfoDialog}>
        <CustomDialogTitle>Thay đổi thông tin</CustomDialogTitle>
        <DialogContent>
          <InfoForm handleClose={handleCloseInfoDialog} />
        </DialogContent>
      </CustomDialog>
      <CustomDialog
        open={openChangePasswordDialog}
        onClose={handleCloseChangePassword}>
        <CustomDialogTitle>Đổi mật khẩu</CustomDialogTitle>
        <DialogContent>
          <PasswordForm handleClose={handleCloseChangePassword} />
        </DialogContent>
      </CustomDialog>
      <CustomDialog
        open={openChangeGmailDialog}
        onClose={handleCloseChangeGmail}>
        <CustomDialogTitle>Đổi gmail</CustomDialogTitle>
        <DialogContent>
          <MailForm handleClose={handleCloseChangeGmail} />
        </DialogContent>
      </CustomDialog>
    </div>
  );
}
