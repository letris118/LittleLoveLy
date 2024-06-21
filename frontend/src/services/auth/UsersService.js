import { toast } from "react-toastify";
import instance from "./customize-axios";
import { routes } from "../../routes";

const loginAPI = (username, password) => {
  return instance.post("/api/auth/login", {
    username,
    password,
  });
};

const products = () => {
  return instance.get("/api/products");
};

const brands = () => {
  return instance.get("/api/brands");
};

const articles = () => {
  return instance.get("/api/articles");
};

const users = () => {
  return instance.get("/api/users");
};

const handleLogout = (navigate) => (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("username");
  navigate(routes.homePage);
  toast.success("Đăng xuất thành công");
};

const formatPrice = (num) => {
  return new Intl.NumberFormat("de-DE").format(num);
};

export {
  loginAPI,
  products,
  brands,
  articles,
  users,
  handleLogout,
  formatPrice,
};
