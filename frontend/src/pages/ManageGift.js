import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import instance from "../services/auth/customize-axios";
import Switch from 'react-switch';
import {
  giftsAll,
  deactivateGift,
  activateGift,
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";

export default function ManageGift() {
    const [giftList, setGiftList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const checkAuthentication = () => {
          const userRole = localStorage.getItem("userRole");
          if (!userRole || userRole !== "ROLE_STAFF") {
              navigate('/');
          }
        };
        checkAuthentication();

        const fetchGifts = async () => {
          try {
            let response = await giftsAll();
            if (response) {
              setGiftList(response.slice(0, 20));
            } else {
              setGiftList([]);
            }
          } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Không thể tải sản phẩm");
            setGiftList([]);
          }
        };
        fetchGifts();
    }, []);

    const handleToggle = async (giftId, currentStatus) => {
        if (currentStatus) {
          await deactivateGift(giftId);
        } else {
          await activateGift(giftId);
        }
        setGiftList(prevState =>
          prevState.map(gift =>
            gift.giftId === giftId ? { ...gift, active: !gift.active } : gift
          )
        );
        
    };

    return (
      <div>
        <StaffHeader/>
  
        <div className="manage-content">
          <StaffSideBar
            
          />    

          <div className="manage-content-detail"> 

            <div className="search-add-table">
              <div className="table-search-bar">
                <input
                  type="text"
                  placeholder="Tìm kiếm quà tặng..."
                />
                <button className="table-search-icon">
                  <img src="../assets/images/search_icon.png" alt="search logo" />
                </button>
              </div>

              <div className="add-product-btn">
                <Link to={routes.addProduct} className="add-product-link">
                  Thêm quà tặng mới
                </Link>
              </div>
            </div>

          <table className="manage-table">
              <thead className="manage-table-head">
                <tr>
                  <th className="index-head" style={{ width: '5%' }}>STT</th>
                  <th className="name-head" style={{ width: '30%' }}>Tên quà tặng</th>
                  <th className="img-head" style={{ width: '15%' }}>Hình ảnh</th>
                  <th className="name-head" style={{ width: '10%' }}>Điểm đổi quà</th>
                  <th className="img-head" style={{ width: '8%' }}>Tồn kho</th>
                  <th className="img-head" style={{ width: '9%' }}>Trạng thái</th>
                  <th className="img-head" style={{ width: '9%' }}>Chỉnh sửa</th>
                </tr>                               
              </thead>

              <tbody className="manage-table-body">
                {giftList.map((gift, index) =>(
                  <tr key={gift.giftId}>
                    <td className="index-body">{index + 1}</td>
                    <td className="name-body">{gift.name}</td>
                    <td className="img-body">
                      <img
                        src={`${instance.defaults.baseURL}/images/gifts/${gift.imagePath}`}
                        alt={gift.name}
                        style={{ width: '50%', height: '50%' }}
                      />                      
                    </td>
                    <td className="point-body">{gift.point}</td>
                    <td className="stock-body">{gift.stock}</td>
                    <td className="active-body"> 
                      <Switch
                        onChange={() => handleToggle(gift.giftId, gift.active)}
                        checked={gift.active}
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