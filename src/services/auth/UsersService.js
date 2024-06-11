import instance from "./customize-axios";

const loginAPI = (username, password) => {
  return instance.post("/auth/login", {
    username,
    password,
  });
};

const products = () => {
  return instance.get("/products");
};

export { loginAPI, products };
