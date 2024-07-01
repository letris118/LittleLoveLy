import { articles } from "../services/auth/UsersService";

export const routes = {
  homePage: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgotPassword",
  resetPassword: "/resetPassword",
  products: "/products",
  brands: "/brands",
  articles: "/articles",
  customer: "/customer",

  manageProduct: "/manageProduct",
  updateProduct: "/updateProduct",
  addProduct: "/addProduct",

  manageOrder: "/manageOrder",
  manageArticle: "/manageArticle",

  manageVoucher: "/manageVoucher",
  addVoucher: "/addVoucher",

  manageAccount: "/manageAccount",
  cart: "/cart",
  staffHomePage: "/staff",
  staffChat: "/chatWithCustomer",

  manageGift: "/manageGift",
  updateGift: "/updateGift",
  addGift: "/addGift",

  staffBrandList: "/brand-list",
  
  checkout: "/checkout",
  statistics: "/statistics",
  manageMember: "/manageMember",
  manageStaff: "/manageStaff",
};
