import axios from "axios";
import { toast } from "react-toastify";
import { routes } from "../../routes";

const instance = axios.create({
  baseURL: "http://localhost:8010",
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      localStorage.setItem("sessionExpired", "true");
      window.location.href = routes.login;
    } else if (error.response) {
      console.error("Response error:", error.response);
      toast.error(
        error.response.data.message || "Tài khoản hoặc mật khẩu không đúng"
      );
    } else if (error.request) {
      console.error("Request error:", error.request);
      toast.error("Không thể kết nối đến server");
    } else {
      console.error("Error:", error.message);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại");
    }
    return Promise.reject(error);
  }
);

export default instance;
