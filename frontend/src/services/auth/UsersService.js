import { toast } from "react-toastify";
import instance from "./customize-axios";
import { routes } from "../../routes";
import axios from 'axios';
const loginAPI = (username, password) => {
  return instance.post("/api/auth/login", {
    username,
    password,
  });
};

const registerAPI = (mail, phone, name, password) => {
  return instance.post("/api/auth/register", {
    mail,
    phone,
    name,
    password,
  });
};

const forgotPasswordAPI = (mail) => {
  return instance.post("/api/auth/forgot-password", {
    mail,
  });
};

const resetPasswordAPI = (newPassword, token) => {
  return instance.post("/api/auth/reset-password", {
    newPassword,
    token,
  });
};

const changePasswordAPI = (currentPassword, newPassword) => {
  return instance.post("/api/auth/change-password", {
    currentPassword,
    newPassword,
  });
};

const changeMailAPI = (mail) => {
  return instance.put("/api/auth/change-mail", {
    mail,
  });
};

const users = () => {
  return instance.get("/api/users");
};

// =========================================PRODUCT===========================================
//get active products
const products = () => {
  return instance.get("/api/products");
};

//get all
const productsAll = () => {
  return instance.get("/api/products/all");
};

//set deactive
const deactivateProduct = (productId) => {
  return instance.put(`/api/products/deactivate/${productId}`);
};

//set active
const activateProduct = (productId) => {
  return instance.put(`/api/products/activate/${productId}`);
};

//get by id
const getProductById = (productId) => {
  return instance.get(`/api/products/${productId}`);
};

//add
const addProduct = (productRequestDTO) => {
  return instance.post("/api/products", productRequestDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//update
const updateProduct = (productId, productRequestDTO) => {
  return instance.put(`/api/products/${productId}`, productRequestDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// =========================================GIFT===========================================

const giftsAll = () => {
  return instance.get("/api/gifts/all");
};

const deactivateGift = (giftId) => {
  return instance.put(`/api/gifts/deactivate/${giftId}`);
};

const activateGift = (giftId) => {
  return instance.put(`/api/gifts/activate/${giftId}`);
};

const addGift = (giftRequestDTO) => {
  return instance.post("/api/gifts", giftRequestDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateGift = (giftId, giftRequestDTO) => {
  return instance.put(`/api/gifts/${giftId}`, giftRequestDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getGiftById = (giftId) => {
  return instance.get(`/api/gifts/${giftId}`);
};

// =========================================VOUCHER===========================================

const vouchers = () => {
  return instance.get("/api/vouchers");
};

const vouchersAll = () => {
  return instance.get("/api/vouchers/all");
};

const deactivateVoucher = (voucherId) => {
  return instance.put(`/api/vouchers/deactivate/${voucherId}`);
};

const activateVoucher = (voucherId) => {
  return instance.put(`/api/vouchers/activate/${voucherId}`);
};

const addVoucher = (voucherRequestDTO) => {
  return instance.post("/api/vouchers", voucherRequestDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getVoucherById = (voucherId) => {
  return instance.get(`/api/vouchers/${voucherId}`);
};

const updateVoucher = (voucherId, voucherRequestDTO) => {
  return instance.put(`/api/vouchers/${voucherId}`, voucherRequestDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// =========================================BRAND + CATEGORIES===========================================
//all brand
const brands = () => {
  return instance.get("/api/brands");
};

//all cate
const categories = () => {
  return instance.get("/api/categories");
};

// =========================================ARTICLE===========================================
const articles = () => {
  return instance.get("/api/articles");
};

const articlesAll = () => {
  return instance.get("/api/articles/all");
};

const getArticleById = (articleId) => {
  return instance.get(`/api/articles/${articleId}`);
};

const deactivateArticle = (articleId) => {
  return instance.put(`/api/articles/deactivate/${articleId}`);
};

const activateArticle = (articleId) => {
  return instance.put(`/api/articles/activate/${articleId}`);
};

const addArticle = (articleRequestDTO) => {
  return instance.post("/api/articles", articleRequestDTO);
};

const updateArticle = (articleId, articleRequestDTO) => {
  return instance.put(`/api/articles/${articleId}`, articleRequestDTO);
};

const activeProducts = () => {
  return instance.get("/api/products");
};

const handleLogout = (navigate, callback) => (e) => {
  e.preventDefault();
  localStorage.clear();
  navigate(routes.homePage);
  toast.success("Đăng xuất thành công");
  if (callback) callback();
};

const formatPrice = (num) => {
  return new Intl.NumberFormat("de-DE").format(num);
};

const updateCart = (id, itemType, quantity) => {
  return instance.put(`/api/cart/update-item`, { id, itemType, quantity });
};

const removeItemCard = (id, itemType, quantity) => {
  return instance.put(`/api/cart/remove-item`, { id, itemType, quantity });
};

const getCart = () => {
  return instance.get(`/api/cart`);
};

const evaluateCart = (cartItems, cusDistrictId, cusWardCode, voucherId) => {
  return instance.post(`/api/orders/evaluate`, {
    cartItems,
    cusDistrictId,
    cusWardCode,
    voucherId,
  });
};

const getUserInfo = (username) => {
  return instance.get(`/api/users/${username}`);
};

const updateUserInfo = (
  username,
  name,
  phone,
  cityCode,
  districtId,
  wardCode,
  street
) => {
  return instance.put(`/api/users/${username}`, {
    username,
    name,
    phone,
    cityCode,
    districtId,
    wardCode,
    street,
  });
};



const createOrder = (order) => {
  return instance.post(`/api/orders`, order);
};

const gifts = () => {
  return instance.get("/api/gifts");
};

const getOrderById = (orderId) => {
  return instance.get(`/api/orders/${orderId}`);
};

const forgotPassword = (mail) => {
  return instance.post("/api/auth/forgot-password", mail);
};

const getCities = () => {
  return instance.get("/api/orders/cities");
};

const getDistrictByCityId = (cityId) => {
  return instance.get(`/api/orders/districts/${cityId}`);
};

const getWardByDistrictId = (districtId) => {
  return instance.get(`/api/orders/wards/${districtId}`);
};
const getOrdersByUsername = (username) => {
  return instance.get(`/api/orders/user/${username}`);
};

const getProductByBrandId = (brandId) => {
  return instance.get(`/api/products/brand/${brandId}`);
};
const getUsersByRoleAll = (role) => {
  return instance.get(`/api/users/role/${role}`);
};

const addReview = (productId, username, feedback, star) => {
  return instance.post(
    "/api/products/review",

    {
      productId,
      username,
      feedback,
      star,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const ordersAll = () => {
  return instance.get("/api/orders");
};

const confirmOrder = (orderId)=>{
  return instance.put(`/api/orders/confirm/${orderId}`);
};

export {
  loginAPI,
  users,
  handleLogout,
  brands,
  categories,
  products,
  productsAll,
  deactivateProduct,
  activateProduct,
  getProductById,
  addProduct,
  updateProduct,
  activeProducts,
  addVoucher,
  getVoucherById,
  vouchersAll,
  deactivateVoucher,
  activateVoucher,
  updateVoucher,
  articles,
  articlesAll,
  deactivateArticle,
  activateArticle,
  giftsAll,
  deactivateGift,
  activateGift,
  addGift,
  updateGift,
  getGiftById,
  formatPrice,
  updateCart,
  removeItemCard,
  getCart,
  evaluateCart,
  getUserInfo,
  createOrder,
  registerAPI,
  gifts,
  getOrderById,
  addArticle,
  getArticleById,
  updateArticle,
  vouchers,
  forgotPassword,
  getCities,
  getDistrictByCityId,
  getWardByDistrictId,
  updateUserInfo,
  forgotPasswordAPI,
  resetPasswordAPI,
  getOrdersByUsername,
  getProductByBrandId,
  getUsersByRoleAll,
  changePasswordAPI,
  changeMailAPI,
  addReview,
  ordersAll,
  confirmOrder,
};
