import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import instance from "../services/auth/customize-axios";
import {
  vouchersAll
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";

export default function ManageVoucher() {
    const [voucherList, setVoucherList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

      const checkAuthentication = () => {
        const userRole = localStorage.getItem("userRole");
        if (!userRole || userRole !== "ROLE_STAFF") {
            navigate('/');
        }
      };
      checkAuthentication();

        const fetchVouchers = async () => {
          try {
            let response = await vouchersAll();
            if (response) {
              setVoucherList(response.slice(0, 20));
            } else {
              setVoucherList([]);
            }
          } catch (error) {
            console.error("Error fetching vouchers:", error);
            toast.error("Không thể tải voucher");
            setVoucherList([]);
          }
        };
        fetchVouchers();
    }, []);

    return (
        <div>
          <StaffHeader/>
    
          <div className="manage-content">
            <StaffSideBar/>

            <div className="manage-content-detail">   

              <table className="manage-table">
                <thead>
                  <tr>
                    <th className="index-head" style={{ width: '5%' }}>STT</th>
                    <th className="name-head" style={{ width: '15%' }}>Tiêu đề</th>
                    <th className="limit-head" style={{ width: '5%' }}>Limit</th>
                    <th className="type-head" style={{ width: '9%' }}>Phân loại</th>
                    <th className="description-head" style={{ width: '15%' }}>Miêu tả</th>
                    <th className="startDate-head" style={{ width: '15%' }}>Ngày bắt đầu</th>
                    <th className="endDate-head" style={{ width: '15%' }}>Ngày hết hạn</th>
                    <th className="active-head" style={{ width: '9%' }}>Trạng thái</th>
                    <th className="update-head" style={{ width: '9%' }}>Chỉnh sửa</th>
                  </tr>                               
                </thead>

                <tbody>
                {voucherList.map((voucher, index) =>(
                  <tr key={voucher.voucherId}>
                    <td className="index-body">{index + 1}</td>
                    <td className="name-body">{voucher.title}</td>
                    <td className="limit-body">{voucher.limit}</td>
                    <td className="type-body">{voucher.type}</td>
                    <td className="description-body">{voucher.description}</td>
                    <td className="startDate-body">{voucher.startDate}</td>
                    <td className="endDate-body">{voucher.endDate}</td>
                    <td className="active-body">{voucher.active}</td>
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