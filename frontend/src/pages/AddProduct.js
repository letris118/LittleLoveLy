import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import { addProduct, brands, categories } from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddProduct() {
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryElements, setCategoryElements] = useState([]);
  const [imageElements, setImageElements] = useState([]);
  const [description, setDescription] = useState("");
  const quillRef = useRef(null);
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
    <input
      name="newImageFiles"
      type="file"
      required
      accept=".png, .jpg"
    ></input>
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const productRequestDTO = new FormData(e.target);
      productRequestDTO.append("description", description);

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

      await addProduct(productRequestDTO);
      navigate(routes.manageProduct, {
        state: { success: "Thêm sản phẩm thành công!" },
      });
    } catch (error) {
      console.error(error);
      toast.error(`Error adding product: ${error.message}`);
    }
  };

  const handleReload = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
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

    checkAuthentication();
    fetchBrandsAndCategories();
  }, [navigate]);

  useEffect(() => {
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
    setCategoryElements([{ id: 1, content: categorySelect }]);
    setImageElements([{ id: 1, content: imageInput }]);
  }, [allCategories]);

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
          {
            <form onSubmit={handleSubmit}>
              <div className="manage-form-input">
                {/* Product NAME */}
                <div className="manage-form-group">
                  <label>Tên sản phẩm</label>
                  <div className="manage-form-control">
                    <input type="text" name="name" required></input>
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
                    ></input>
                  </div>
                </div>

                {/* Product DESCRIPTION */}
                <div className="manage-form-group">
                  <label>Mô tả sản phẩm</label>
                  <div className="manage-form-control">
                    <ReactQuill
                      style={{ backgroundColor: "white" }}
                      ref={quillRef}
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
                      defaultValue="1"
                    ></input>
                  </div>
                </div>

                {/* Product BRAND */}
                <div className="manage-form-group">
                  <label>Thương hiệu</label>
                  <div className="manage-form-control">
                    <select name="brandId" required>
                      <option value="">Chọn thương hiệu</option>
                      {allBrands.map((brand, index) => (
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
                  <div className="manage-form-control-img">
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
              </div>

              {/* Product BUTTON */}
              <div className="manage-form-btn">
                <button
                  className="save-manage-btn save-manage-link"
                  type="submit"
                >
                  Thêm sản phẩm
                </button>

                <div className="cancel-manage-btn">
                  <button onClick={handleReload} className="cancel-manage-link">
                    Đặt lại
                  </button>
                </div>
              </div>
            </form>
          }
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
