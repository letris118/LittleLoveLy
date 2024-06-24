import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import Switch from 'react-switch';
import instance from "../services/auth/customize-axios";
import {
  productsAll,
  deactivateProduct,
  activateProduct
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import { jwtDecode } from "jwt-decode";
import "../assets/css/manage.css";

export default function ManageProduct() {
    const [productList, setProductList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const checkAuthentication = () => {
          const userRole = localStorage.getItem("userRole");
          if (!userRole || userRole !== "ROLE_STAFF") {
              navigate('/');
          }
        };
        checkAuthentication();

        const fetchProducts = async () => {
          try {
            let response = await productsAll();
            if (response) {
              setProductList(response.slice(0, 50));
            } else {
              setProductList([]);
            }
          } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Không thể tải sản phẩm");
            setProductList([]);
          }
        };
        fetchProducts();
    }, []);

    const handleToggle = async (productId, currentStatus) => {
      try {
        if (currentStatus) {
          await deactivateProduct(productId);
        } else {
          await activateProduct(productId);
        }
  
        setProductList(prevState =>
          prevState.map(product =>
            product.productId === productId ? { ...product, active: !product.active } : product
          )
        );
        toast.success('Cập nhập trạng thái thành công');
      } catch (error) {
        toast.error('Lỗi khi cập nhập trạng thái');
      }
    };

    return (
      <div>
        <ToastContainer />
        <StaffHeader/>

        <div className="manage-content">
          <StaffSideBar/>    

          <div className="manage-content-detail">   
            
            <table className="manage-table">
              <thead>
                <tr>
                  <th className="index-head" style={{ width: '5%' }}>STT</th>
                  <th className="name-head" style={{ width: '30%' }}>Tên sản phẩm</th>
                  <th className="img-head" style={{ width: '15%' }}>Hình ảnh</th>   
                  <th className="brand-head" style={{ width: '10%' }}>Thương hiệu</th>
                  <th className="stock-head" style={{ width: '8%' }}>Tồn kho</th>
                  <th className="active-head" style={{ width: '9%' }}>Trạng thái</th>
                  <th className="update-head" style={{ width: '9%' }}>Chỉnh sửa</th>
                </tr>                               
              </thead>

              <tbody>
                {productList.map((product, index) =>(
                  <tr key={product.productId}>
                    <td className="index-body">{index + 1}</td>
                    <td className="name-body">{product.name}</td>
                    <td className="img-body">
                      {product.productImages.slice(0, 1).map((image) => (
                        <img
                          src={`${instance.defaults.baseURL}/images/products/${image.imagePath}`}
                          alt={product.name}
                          style={{ width: '30%', height: '30%' }}
                        />
                      ))}
                    </td>

                    <td className="brand-body">
                      <img
                        src={`${instance.defaults.baseURL}/images/brands/${product.brand.logo}`}
                        alt={product.brand.name}
                        style={{ width: '50%', height: '50%' }}
                      />                      
                    </td>

                    <td className="stock-body">{product.stock}</td>
                    <td className="active-body">
                      <Switch
                        onChange={() => handleToggle(product.productId, product.active)}
                        checked={product.active}
                        offColor="#ff0000"
                        onColor="#27ae60"
                      />
                    </td>
                    
                    <td className="update-body">
                      <Link
                      to="#" style={{color: "#7f8c8d"}}>
                      Chi tiết 
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>    
               
        </div>
      </div>
    );
  }