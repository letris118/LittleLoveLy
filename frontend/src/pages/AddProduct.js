import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import {
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";

export default function AddProduct() {
  const [productInfo, setProductInfo] = useState(null);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [allCate, setAllCate] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const checkAuthentication = () => {
          const userRole = localStorage.getItem("userRole");
          if (!userRole || userRole !== "ROLE_STAFF") {
              navigate('/');
          }
        };
        checkAuthentication();

    }, []);

    return (
      <div>
        <StaffHeader/>
  
        <div className="manage-content">
          <StaffSideBar
            
          />    

          <div className="manage-content-detail">   
            {/* 
            
            
            
            */}
          </div>   
               
        </div>
      </div>
    );
  }