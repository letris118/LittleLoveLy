import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import {
  articles,
  brands,
  handleLogout,
  products,
  users,
} from "../services/auth/UsersService";
import BrandPresentation from "../components/BrandPresentation";
import ProductPresentation from "../components/ProductPresentation";
import ManageSidebar from "../components/ManageSideBar";
import { jwtDecode } from "jwt-decode";
import "../assets/css/staff.css";

export default function ManageProduct() {
    const [productList, setProductList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

      const checkAuthentication = () => {
        const userRole = localStorage.getItem("userRole");
        if (!userRole || userRole !== "ROLE_STAFF") {
            navigate('/login');
        }
      };
      checkAuthentication();

        const fetchProducts = async () => {
          try {
            let response = await products();
            if (response) {
              setProductList(response.slice(0, 20));
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

    return (
        <div>
          <ToastContainer />
          <StaffHeader/>
    
          <div className="manage-content">
            <ManageSidebar
              handleLogout={handleLogout(navigate)}
            />

            <div className="staff-content-detail">   
              VOUCHER
            </div>   

            </div>
        </div>
      );
    }