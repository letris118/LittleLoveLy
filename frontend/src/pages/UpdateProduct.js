
import React, { useEffect, useState } from "react";
import { routes } from "../routes";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import {
  getProductById,
  brands,
  categories,
  updateProduct
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import instance from "../services/auth/customize-axios";
import "../assets/css/manage.css";

export default function UpdateProduct() {
  const [productInfo, setProductInfo] = useState(null);
  const [allBrands, setAllBrands] = useState([]);
  const [allCate, setAllCate] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate('/');
      }
    };
    checkAuthentication();

    const fetchProductDetails = async () => {
      const queryParams = new URLSearchParams(location.search);
      const productId = queryParams.get('id');

      try {
        const productResponse = await getProductById(productId);
        if (productResponse) {
          setProductInfo(productResponse);
        } else {
          toast.error("Không thể tải thông tin sản phẩm");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Không thể tải thông tin sản phẩm");
      }
    };

    const fetchBrandsAndCategories = async () => {
      try {
        const brandResponse = await brands();
        const categoryResponse = await categories();
        setAllBrands(brandResponse);
        setAllCate(categoryResponse);
      } catch (error) {
        console.error("Error fetching brands or categories:", error);
      }
    };

    fetchProductDetails();
    fetchBrandsAndCategories();
  }, [location.search, navigate]);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
    try{ 
      const respones = await updateProduct(productInfo.productId, productInfo);

    }catch(error){
      console.error(error)
    }
  };

  if (!productInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar />

        <div className="update-content-detail">
          {productInfo ? (
            <form onSubmit={handleSubmit}>

              {/* name */}
              <div className="manage-form-group">
                <label htmlFor="productName" className="manage-label">Tên sản phẩm:</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={productInfo.name}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, name: e.target.value })
                  }
                  className="manage-form-control"
                />
              </div>


              {/* des */}
              <div className="manage-form-group">
                <label htmlFor="productDescription" className="manage-label">Mô tả:</label>

                <textarea className="manage-form-control"
                  id="productDescription"
                  name="productDescription"
                  value={productInfo.description}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, description: e.target.value })
                  }
                />
              </div>


              {/* img */}
              <div className="manage-form-group">
                <label htmlFor="productImg" className="manage-label">Hình ảnh:</label>

                <div className="manage-form-control">
                  {productInfo.productImages.slice(0, 20).map((image) => (
                    <img
                      key={image.imageId}
                      src={`${instance.defaults.baseURL}/images/products/${image.imagePath}`}
                      alt={productInfo.name}
                      style={{ width: '10%', height: '10%', marginLeft: '10px', marginTop: '10px' }}
                    />
                  ))}
                </div>
              </div>

              {/* brand */}
              <div className="manage-form-group">
                <label htmlFor="productBrand" className="manage-label">Thương Hiệu:</label>

                <select className="form-select"
                  value={selectedBrand}
                  onChange={handleBrandChange}>
                  <option value="">{productInfo?.brand?.name || ""}</option>
                  {allBrands.map((brand, index) => (
                    <option key={index} value={brand.brandId}>{brand.name}</option>
                  ))}
                </select>
              </div>

              {/* list price */}
              <div className="manage-form-group">
                <label htmlFor="productListedPrice" className="manage-label">Giá niêm yết:</label>

                <input
                  type="text"
                  id="productListedPrice"
                  name="productListedPrice"
                  value={productInfo.listedPrice}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, listedPrice: e.target.value })
                  }
                  className="manage-form-control"
                />
              </div>

              {/* sell price */}
              <div className="manage-form-group">
                <label htmlFor="productSellingPrice" className="manage-label">Giá bán:</label>
                <input
                  type="text"
                  id="productSellingPrice"
                  name="productSellingPrice"
                  value={productInfo.sellingPrice}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, sellingPrice: e.target.value })
                  }
                  className="manage-form-control"
                />
              </div>

              {/* stock */}
              <div className="manage-form-group">
                <label htmlFor="productStock" className="manage-label">Tồn kho:</label>

                <input
                  type="text"
                  id="productStock"
                  name="productStock"
                  value={productInfo.stock}
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, stock: e.target.value })
                  }
                  className="manage-form-control"
                />
              </div>


              <div className="manage-form-btn">
                <button className="save-manage-btn" type="submit">
                  <Link to={routes.manageProduct} className="save-manage-link">
                    Lưu sửa đổi
                  </Link>
                </button>

                <div className="cancel-manage-btn">
                  <Link to={routes.manageProduct} className="cancel-manage-link">
                    Hủy
                  </Link>
                </div>

              </div>

            </form>
          ) : (
            <p>Đang tải thông tin sản phẩm...</p>
          )}
        </div>
      </div>
    </div>
  );
}


