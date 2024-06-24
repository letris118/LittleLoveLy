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
  localStorage.clear();
  navigate(routes.homePage);
  toast.success("Đăng xuất thành công");
};

const formatPrice = (num) => {
  return new Intl.NumberFormat("de-DE").format(num);
};

document.addEventListener("DOMContentLoaded", function () {
  const province = document.getElementById("province");
  const district = document.getElementById("district");
  const ward = document.getElementById("ward");

  const apiGetAddress =
    "https://online-gateway.ghn.vn/shiip/public-api/master-data";
  const apiShippingOrder =
    "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order";
  const token = "e2fd513c-0f3e-11ef-8aec-2293d60b7bbb";
  const shop_id = "5060405";

  const headers = { token: token };

  function clearSelect(selectElement) {
    selectElement.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select an option";
    selectElement.appendChild(defaultOption);
  }

  function fetchAddress(api, selectElement, valueKey, contentKey) {
    fetch(api, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        data.data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item[valueKey];
          option.textContent = item[contentKey];
          selectElement.appendChild(option);
        });
      });
  }

  function constructUrl(baseUrl, params) {
    const url = new URL(baseUrl);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return url.toString();
  }

  fetchAddress(
    apiGetAddress + "/province",
    province,
    "ProvinceID",
    "ProvinceName"
  );

  province.addEventListener("change", function () {
    clearSelect(district);
    clearSelect(ward);

    if (province.value) {
      var districtApi = constructUrl(apiGetAddress + "/district", {
        province_id: province.value,
      });
      fetchAddress(districtApi, district, "DistrictID", "DistrictName");
    }
  });

  district.addEventListener("change", function () {
    clearSelect(ward);
    // clearSelect(service);

    if (district.value) {
      var wardApi = constructUrl(apiGetAddress + "/ward", {
        district_id: district.value,
      });
      fetchAddress(wardApi, ward, "WardCode", "WardName");
    }
  });
});

export {
  loginAPI,
  products,
  brands,
  articles,
  users,
  handleLogout,
  formatPrice,
};
