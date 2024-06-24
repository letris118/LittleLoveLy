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

const handleAddToCart = (id, quantity) => {
  if (localStorage.getItem("token")) {
    return instance.put("/api/cart/add", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {
        id: id,
        itemType: "product",
        quantity: quantity,
      },
    });
  }
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
  brands,
  articles,
  users,
  handleLogout,
  formatPrice,
  cart,
};
