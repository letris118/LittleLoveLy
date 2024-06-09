import instance from "./customize-axios";

const loginAPI = (username, password) => {
  return instance.post("/auth/login", {
    username,
    password,
  });
};

export { loginAPI };
