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
  if (localStorage.getItem("token")) {
    return instance.get("/api/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  return instance.get("/api/products");
};

const productsAll = () => {
  return instance.get("/api/products/all");
};

const brands = () => {
  if (localStorage.getItem("token")) {
    return instance.get("/api/brands", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  return instance.get("/api/brands");
};

const articles = () => {
  if (localStorage.getItem("token")) {
    return instance.get("/api/articles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  return instance.get("/api/articles");
};

const articlesAll = () => {
  return instance.get("/api/articles/all");
};

const users = () => {
  if (localStorage.getItem("token")) {
    return instance.get("/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  return instance.get("/api/users");
};

const addToCart = (id, itemType, quantity) => {
  const token = localStorage.getItem("token");
  return instance.put(
    `/api/cart/add`,
    { id, itemType, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const activeProducts = () => {
  return instance.get("/api/products");
};

const deactivateProduct = (productId) => {
  return instance.put(`/api/products/deactivate/${productId}`);
};

const activateProduct = (productId) => {
  return instance.put(`/api/products/activate/${productId}`);
};

const handleLogout = (navigate) => (e) => {
  e.preventDefault();
  localStorage.clear();
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
  articles,
  articlesAll,
  users,
  handleLogout,
  formatPrice,
  activeProducts,
  deactivateProduct,
  activateProduct,
  addToCart,
};
