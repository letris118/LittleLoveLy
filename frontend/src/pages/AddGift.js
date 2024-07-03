import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { routes } from "../routes"
import StaffHeader from "../components/StaffHeader"
import { ToastContainer, toast } from "react-toastify"
import {
  addGift,
} from "../services/auth/UsersService"
import StaffSideBar from "../components/StaffSideBar"
import "../assets/css/manage.css"
import StaffBackToTop from "../components/StaffBackToTop"
export default function AddGift() {
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    try {

      e.preventDefault()
      const giftRequestDTO = new FormData(e.target)

      await addGift(giftRequestDTO)
      navigate(routes.manageGift, { state: { success: 'Thêm quà tặng thành công!' } });
    } catch (error) {
      toast.error(`Error adding gift: ${error.message}`)
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


    checkAuthentication()

  }, [navigate])


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

                {/* NAME */}
                <div className="manage-form-group">
                  <label>Tên quà tặng</label>
                  <div className="manage-form-control">
                    <input type="text" name="name" required></input>
                  </div>
                </div>

                {/* PRICE */}
                <div className="manage-form-group">
                  <label>Điểm đổi quà</label>
                  <div className="manage-form-control">
                    <input type="number" name="point" step="1" min="0" required></input>
                  </div>
                </div>

                {/* STOCK */}
                <div className="manage-form-group">
                  <label>Tồn kho</label>
                  <div className="manage-form-control">
                    <input type="number" name="stock" step="1" min="1" defaultValue="1"></input>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="manage-form-group">
                  <label>Hình minh họa quà tặng</label>
                  <div className="manage-form-control-img">
                    <input name="newImageFile" type="file" required accept=".png, .jpg"></input>
                  </div>
                </div>

              </div>

              {/* BUTTON */}
              <div className="manage-form-btn">
                <button className="save-manage-btn save-manage-link" type="submit">
                  Thêm quà tặng
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
  )
}