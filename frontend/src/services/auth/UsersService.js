import { toast } from "react-toastify";
import instance from "./customize-axios";
import { routes } from "../../routes";

const loginAPI = (username, password) => {
  return instance.post("/api/auth/login", {
    username,
    password,
  });
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

//update
const updateProduct = (productId, productData) => {
  return instance.put(`/api/products/${productId}`, productData, {
    headers:{
      'Content-Type': 'multipart/form-data',
    }
  });
};



const giftsAll = () => {
  return instance.get("/api/gifts/all");
};

const deactivateGift = (giftId) => {
  return instance.put(`/api/gifts/deactivate/${giftId}`);
};

const activateGift = (giftId) => {
  return instance.put(`/api/gifts/activate/${giftId}`);
};



const vouchersAll = () => {
  return instance.get("/api/vouchers/all");
};

const deactivateVoucher = (voucherId) => {
  return instance.put(`/api/vouchers/deactivate/${voucherId}`);
};

const activateVoucher = (pvoucherId) => {
  return instance.put(`/api/vouchers/activate/${pvoucherId}`);
};


//all brand
const brands = () => {
  return instance.get("/api/brands");
};

//all cate
const categories = () => {
  return instance.get("/api/categories");
};




const articles = () => {
  return instance.get("/api/articles");
};

const articlesAll = () => {
  return instance.get("/api/articles/all");
};

const deactivateArticle = (articleId) => {
  return instance.put(`/api/articles/deactivate/${articleId}`);
};

const activateArticle = (articleId) => {
  return instance.put(`/api/articles/activate/${articleId}`);
};



const formatPrice = (num) => {
  return new Intl.NumberFormat("de-DE").format(num);
};

export {
  loginAPI,
  users,
  handleLogout,

  products,
  productsAll,
  deactivateProduct,
  activateProduct,
  getProductById,
  updateProduct,

  brands,
  categories,

  vouchersAll,
  deactivateVoucher,
  activateVoucher,

  articles,
  articlesAll,
  deactivateArticle,
  activateArticle,

  giftsAll,
  deactivateGift,
  activateGift,

  formatPrice
  
};
