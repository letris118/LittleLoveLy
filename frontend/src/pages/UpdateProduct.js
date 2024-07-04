import React, { useEffect, useState, useRef } from "react";
import { routes } from "../routes";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import {
  getProductById,
  brands,
  categories,
  updateProduct,
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import instance from "../services/auth/customize-axios";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { set } from "date-fns";

export default function UpdateProduct() {
  const [productInfo, setProductInfo] = useState(null);
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryElements, setCategoryElements] = useState([]);
  const [imageElements, setImageElements] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [description, setDescription] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const addNewCategoryElement = (e) => {
    e.preventDefault();
    const newId = categoryElements.length + 1;
    const categorySelect = (
      <select name="categoryIds" required>
        <option value="">Chọn phân loại</option>
        {allCategories.map((category, index) => (
          <option key={index} value={category.categoryId}>
            {category.name}
          </option>
        ))}
      </select>
    );
    const newElements = [
      ...categoryElements,
      { id: newId, content: categorySelect },
    ];
    setCategoryElements(newElements);
  };

  const removeCategoryElement = (e) => {
    e.preventDefault();
    if (categoryElements.length === 1) {
      return;
    }

    const updatedCategoryElements = categoryElements.slice(0, -1);
    setCategoryElements(updatedCategoryElements);
  };

  const imageInput = (
    <input name="newImageFiles" type="file" accept=".png, .jpg"></input>
  );

  const addNewImageElement = (e) => {
    e.preventDefault();
    const newId = imageElements.length + 1;
    const newElements = [...imageElements, { id: newId, content: imageInput }];
    setImageElements(newElements);
  };

  const removeImageElement = (e) => {
    e.preventDefault();
    if (imageElements.length === 1) {
      return;
    }

    const updatedImageElements = imageElements.slice(0, -1);
    setImageElements(updatedImageElements);
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const queryParams = new URLSearchParams(location.search);
      const productId = queryParams.get("id");

      try {
        const productResponse = await getProductById(productId);
        if (productResponse) {
          setProductInfo(productResponse);
          setDescription(productResponse.description);
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
        setAllCategories(categoryResponse);
      } catch (error) {
        console.error("Error fetching brands or categories:", error);
      }
    };

    fetchProductDetails();
    fetchBrandsAndCategories();
  }, [location.search]);

  useEffect(() => {
    if (!productInfo || !allCategories || !allBrands) {
      return; // Return early if info is not yet available
    }

    const initialCategoryElements = productInfo.categories.map(
      (category, index) => {
        const categorySelect = (
          <select name="categoryIds" required>
            <option value={category.categoryId}>{category.name}</option>{" "}
            {/* First option based on productInfo.categories */}
            {allCategories
              .filter((c) => c.categoryId !== category.categoryId)
              .map((c, idx) => (
                <option key={idx} value={c.categoryId}>
                  {c.name}
                </option>
              ))}
          </select>
        );
        return { id: index + 1, content: categorySelect }; // Use index + 1 as id for each select
      }
    );

    setCategoryElements(initialCategoryElements);
    setImageElements([{ id: 1, content: imageInput }]);
  }, [productInfo, allCategories, allBrands]);

  const handleImageClick = (imageId) => {
    setSelectedImageIds((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        return prevSelected.filter((id) => id !== imageId);
      } else {
        return [...prevSelected, imageId];
      }
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const productRequestDTO = new FormData(e.target);
      productRequestDTO.append("description", description);
      productRequestDTO.append("productId", productInfo.productId);
      selectedImageIds.forEach((imageId) => {
        productRequestDTO.append("imageIds", imageId);
      });

      const uniqueCategoryIds = new Set(
        productRequestDTO.getAll("categoryIds")
      );
      if (
        uniqueCategoryIds.size !==
        productRequestDTO.getAll("categoryIds").length
      ) {
        toast.error("Phân loại trùng lặp!");
        return;
      }

      const newImageFiles = productRequestDTO.getAll("newImageFiles");
      productRequestDTO.delete("newImageFiles");
      newImageFiles.forEach((file) => {
        if (file && file.size > 0) {
          productRequestDTO.append("newImageFiles", file);
        }
      });

      if (
        productRequestDTO.getAll("imageIds").length === 0 &&
        productRequestDTO.getAll("newImageFiles").length === 0
      ) {
        toast.error("Hãy chọn hình ảnh cho sản phẩm!");
        return;
      }

      if (
        !window.confirm(
          `Bạn đang sử dụng ${
            productRequestDTO.getAll("imageIds").length
          } hình ảnh có sẵn`
        )
      )
        return;

      await updateProduct(
        productRequestDTO.get("productId"),
        productRequestDTO
      );
      navigate(routes.manageProduct, {
        state: { success: "Cập nhập sản phẩm thành công!" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!productInfo) {
    return <div>Loading...</div>;
  }
  const handleReload = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "link",
    "list",
    "indent",
    "size",
    "header",
    "color",
    "background",
    "font",
    "align",
    "width",
    "style",
    "code-block",
  ];

  return (
    <div>
      <ToastContainer />
      <StaffHeader />

      <div className="manage-content">
        <StaffSideBar />

        <div className="add-update-content-detail">
          {productInfo ? (
            <form onSubmit={handleSubmit}>
              <div className="manage-form-input">
                {/* Product NAME */}
                <div className="manage-form-group">
                  <label>Tên sản phẩm</label>
                  <div className="manage-form-control">
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={productInfo.name}
                    ></input>
                  </div>
                </div>

                {/* Product list PRICE */}
                <div className="manage-form-group">
                  <label>Giá niêm yết</label>
                  <div className="manage-form-control">
                    <input
                      type="number"
                      name="listedPrice"
                      step="500"
                      min="0"
                      required
                      defaultValue={productInfo.listedPrice}
                    ></input>
                  </div>
                </div>

                {/* Product sell PRICE */}
                <div className="manage-form-group">
                  <label>Giá bán</label>
                  <div className="manage-form-control">
                    <input
                      type="number"
                      name="sellingPrice"
                      step="500"
                      min="0"
                      required
                      defaultValue={productInfo.sellingPrice}
                    ></input>
                  </div>
                </div>

                {/* Product DESCRIPTION */}
                <div className="manage-form-group">
                  <label>Mô tả sản phẩm</label>
                  <div className="manage-form-control">
                    <ReactQuill
                      style={{ backgroundColor: "white" }}
                      value={description}
                      modules={modules}
                      formats={formats}
                      onChange={setDescription}
                    />
                  </div>
                </div>

                {/* Product STOCK */}
                <div className="manage-form-group">
                  <label>Tồn kho</label>
                  <div className="manage-form-control">
                    <input
                      type="number"
                      name="stock"
                      step="1"
                      min="1"
                      defaultValue={productInfo.stock}
                    ></input>
                  </div>
                </div>

                {/* Product BRAND */}
                <div className="manage-form-group">
                  <label>Thương hiệu</label>
                  <div className="manage-form-control">
                    <select name="brandId" required>
                      <option value={productInfo.brand.brandId}>
                        {productInfo.brand.name}
                      </option>
                      {allBrands
                        .filter(
                          (brand) => brand.brandId !== productInfo.brand.brandId
                        )
                        .map((brand, index) => (
                          <option key={index} value={brand.brandId}>
                            {brand.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Product TYPE */}
                <div className="manage-form-group">
                  <label>Phân loại</label>

                  <div className="manage-form-type-control">
                    {categoryElements.map((e) => (
                      <div key={e.id}>
                        {e.content}
                        {e.id === categoryElements.length && (
                          <button
                            style={{
                              marginLeft: "15px",
                              borderRadius: "10px",
                              border: "1px solid rgb(67, 65, 65)",
                            }}
                            onClick={addNewCategoryElement}
                          >
                            Thêm
                          </button>
                        )}
                        {e.id !== 1 && e.id === categoryElements.length && (
                          <button
                            style={{
                              marginLeft: "15px",
                              borderRadius: "10px",
                              border: "1px solid rgb(67, 65, 65)",
                            }}
                            onClick={removeCategoryElement}
                          >
                            Hủy bỏ
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product IMAGE */}
                <div className="manage-form-group">
                  <label>Hình minh họa sản phẩm</label>
                  <div className="manage-form-control">
                    {productInfo.productImages.map((image, index) => (
                      <img
                        src={`${instance.defaults.baseURL}/images/products/${image.imagePath}`}
                        alt={productInfo.name}
                        key={index}
                        style={{
                          filter: selectedImageIds.includes(image.imageId)
                            ? "brightness(50%)"
                            : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(image.imageId)}
                      />
                    ))}
                  </div>
                  {imageElements.map((e) => (
                    <div key={e.id}>
                      {e.content}
                      {e.id === 1 && (
                        <button
                          style={{
                            marginLeft: "15px",
                            borderRadius: "10px",
                            border: "1px solid rgb(67, 65, 65)",
                          }}
                          onClick={addNewImageElement}
                        >
                          Thêm
                        </button>
                      )}
                      {e.id === 1 && imageElements.length > 1 && (
                        <button
                          style={{
                            marginLeft: "15px",
                            borderRadius: "10px",
                            border: "1px solid rgb(67, 65, 65)",
                          }}
                          onClick={removeImageElement}
                        >
                          Hủy bỏ
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Product BUTTON */}
              <div className="manage-form-btn">
                <button
                  className="save-manage-btn save-manage-link"
                  type="submit"
                >
                  Cập nhật sản phẩm
                </button>

                <div className="cancel-manage-btn">
                  <button onClick={handleReload} className="cancel-manage-link">
                    Đặt lại
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p>Đang tải thông tin sản phẩm...</p>
          )}
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
