import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:8010",
});

instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    if (error.response) {
      console.error("Response error:", error.response);
      toast.error(error.response.data.message || "Không tìm thấy người dùng");
    } else if (error.request) {
      console.error("Request error:", error.request);
      toast.error("Không thể kết nối đến server");
    } else {
      console.error("Error:", error.message);
      toast.error("Dẫ xảy ra lỗi. Vui lòng thử lại");
    }
    return Promise.reject(error);
  }
);

export default instance;
