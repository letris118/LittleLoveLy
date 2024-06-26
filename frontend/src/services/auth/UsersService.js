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

const productsAll = () => {
  return instance.get("/api/products/all");
};

const giftsAll = () => {
  return instance.get("/api/gifts/all");
};

const vouchersAll = () => {
  return instance.get("/api/vouchers/all");
};

const brands = () => {
  return instance.get("/api/brands");
};

const articles = () => {
  return instance.get("/api/articles");
};

const articlesAll = () => {
  return instance.get("/api/articles/all");
};

const users = () => {
  return instance.get("/api/users");
};

const activeProducts = () => {
  return instance.get('/api/products');
};

const deactivateProduct = (productId) => {
  return instance.put(`/api/products/deactivate/${productId}`);
};

const activateProduct = (productId) => {
  return instance.put(`/api/products/activate/${productId}`);
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
  productsAll,
  brands,
  vouchersAll,
  articles,
  articlesAll,
  giftsAll,
  users,
  handleLogout,
  formatPrice,
  activeProducts,
  deactivateProduct,
  activateProduct
};
