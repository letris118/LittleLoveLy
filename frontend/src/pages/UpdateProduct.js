import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import {
  articles,
  brands,
  handleLogout,
  products,
  users,
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";

export default function UpdateProduct() {
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
        <StaffHeader/>
  
        <div className="manage-content">
          <StaffSideBar
            
          />    

          <div className="manage-content-detail">   
            update đi
          </div>   
               
        </div>
      </div>
    );
  }