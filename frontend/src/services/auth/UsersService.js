import { toast } from "react-toastify";
import instance from "./customize-axios";
import { routes } from "../../routes";
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

const users = () => {
  return instance.get("/api/users");
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
  return instance.post('/api/gifts', giftRequestDTO, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const updateGift = (giftId, giftRequestDTO) => {
  return instance.put(`/api/gifts/${giftId}`, giftRequestDTO, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const getGiftById = (giftId) => {
  return instance.get(`/api/gifts/${giftId}`);
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
  return instance.post('/api/vouchers', voucherRequestDTO, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
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
const activeProducts = () => {
  return instance.get("/api/products");
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

const getUserInfo = (userId) => {
  return instance.get(`/api/users/${userId}`);
};

const createOrder = (order) => {
  return instance.post(`/api/orders`, order);
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
  addProduct,
  updateProduct,
  activeProducts,
  brands,
  categories,
  vouchersAll,
  deactivateVoucher,
  activateVoucher,

  addVoucher,

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
};
