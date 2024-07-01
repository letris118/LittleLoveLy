import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { routes } from "../routes"
import StaffHeader from "../components/StaffHeader"
import { ToastContainer, toast } from "react-toastify"
import {
  addProduct,
  brands,
  categories
} from "../services/auth/UsersService"
import StaffSideBar from "../components/StaffSideBar"
import "../assets/css/manage.css"

export default function AddProduct() {

  const [allBrands, setAllBrands] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [categoryElements, setCategoryElements] = useState([])
  const [imageElements, setImageElements] = useState([])
  const navigate = useNavigate()

  const addNewCategoryElement = (e) => {
    e.preventDefault()
    const newId = categoryElements.length + 1
    const categorySelect = (
      <select name="categoryIds" required>
        <option value="">Chọn phân loại</option>
        {allCategories.map((category, index) => (
          <option key={index} value={category.categoryId}>
            {category.name}
          </option>
        ))}
      </select>
    )
    const newElements = [...categoryElements, { id: newId, content: categorySelect }]
    setCategoryElements(newElements)
  }

  const removeCategoryElement = (e) => {
    e.preventDefault()
    if (categoryElements.length === 1) {
      return
    }

    const updatedCategoryElements = categoryElements.slice(0, -1)
    setCategoryElements(updatedCategoryElements)
  }

  const imageInput = (
    <input name="newImageFiles" type="file" required accept=".png, .jpg"></input>
  )

  const addNewImageElement = (e) => {
    e.preventDefault()
    const newId = imageElements.length + 1
    const newElements = [...imageElements, { id: newId, content: imageInput }]
    setImageElements(newElements)
  }

  const removeImageElement = (e) => {
    e.preventDefault()
    if (imageElements.length === 1) {
      return
    }

    const updatedImageElements = imageElements.slice(0, -1)
    setImageElements(updatedImageElements)
  }

  const handleSubmit = async (e) => {
    try {

      e.preventDefault()
      const productRequestDTO = new FormData(e.target)

      const uniqueCategoryIds = new Set(productRequestDTO.getAll('categoryIds'))
      if (uniqueCategoryIds.size !== productRequestDTO.getAll('categoryIds').length) {
        toast.error('Phân loại trùng lặp!')
        return
      }

      await addProduct(productRequestDTO)
      navigate(routes.manageProduct)
      toast.success('Thêm sản phẩm thành công!')
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`)
    }
  }

  const handleReload = (e) => {
    e.preventDefault(); 
    window.location.reload()
  }

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole")
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate('/')
      }
    }
    const fetchBrandsAndCategories = async () => {
      try {
        const brandResponse = await brands()
        const categoryResponse = await categories()
        setAllBrands(brandResponse)
        setAllCategories(categoryResponse)
      } catch (error) {
        console.error("Error fetching brands or categories:", error)
      }
    }

    checkAuthentication()
    fetchBrandsAndCategories()

  }, [navigate])

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
    )
    setCategoryElements([{ id: 1, content: categorySelect }])
    setImageElements([{ id: 1, content: imageInput }])

  }, [allCategories])


  return (
    <div>
      <ToastContainer />
      <StaffHeader />

      <div className="manage-content">
        <StaffSideBar />

        <div className="manage-content-detail">
          {
            <form onSubmit={handleSubmit}>

              <div>
                <label>Tên sản phẩm</label>
                <div>
                  <input type="text" name="name" required></input>
                </div>
              </div>

              <div>
                <label>Giá niêm yết</label>
                <div>
                  <input type="number" name="listedPrice" step="500" min="0" required></input>
                </div>
              </div>

              <div>
                <label>Giá bán</label>
                <div>
                  <input type="number" name="sellingPrice" step="500" min="0" required></input>
                </div>
              </div>

              <div>
                <label>Mô tả sản phẩm</label>
                <div>
                  <textarea name="description" required></textarea>
                </div>
              </div>

              <div>
                <label>Tồn kho</label>
                <div>
                  <input type="number" name="stock" step="1" min="1" defaultValue="1"></input>
                </div>
              </div>

              <div>
                <label>Thương hiệu</label>
                <div>
                  <select name="brandId" required>
                    <option value="">Chọn thương hiệu</option>
                    {allBrands.map((brand, index) => (
                      <option key={index} value={brand.brandId}>{brand.name}</option>
                    ))}

                  </select>
                </div>
              </div>

              <div>
                <label>Phân loại</label>

                {categoryElements.map((e) => (
                  <div key={e.id}>
                    {e.content}
                    {e.id === categoryElements.length && (
                      <button onClick={addNewCategoryElement}>Thêm</button>
                    )}
                    {e.id !== 1 && e.id === categoryElements.length && (
                      <button onClick={removeCategoryElement}>Hủy bỏ</button>
                    )}

                  </div>
                ))}

              </div>

              <div>
                <label>Hình minh họa sản phẩm</label>

                {imageElements.map((e) => (
                  <div key={e.id}>
                    {e.content}
                    {e.id === 1 && (
                      <button onClick={addNewImageElement}>Thêm</button>
                    )}
                    {e.id === 1 && imageElements.length > 1 && (
                      <button onClick={removeImageElement}>Hủy bỏ</button>
                    )}

                  </div>
                ))}
              </div>

              <div className="manage-form-btn">
                <button className="save-manage-btn save-manage-link" type="submit">
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
    </div>
  )
}