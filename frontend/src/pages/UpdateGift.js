import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import StaffHeader from "../components/StaffHeader"
import { toast } from "react-toastify"
import {
    updateGift,
    getGiftById,
} from "../services/auth/UsersService"
import StaffSideBar from "../components/StaffSideBar"
import "../assets/css/manage.css"
import StaffBackToTop from "../components/StaffBackToTop"
export default function UpdateGift() {
    const [giftInfo, setGiftInfo] = useState(null)

    const location = useLocation()


    const navigate = useNavigate()
    useEffect(() => {
        const fetchGiftDetails = async () => {
            const queryParams = new URLSearchParams(location.search);
            const giftId = queryParams.get('id')

            try {
                const giftResponse = await getGiftById(giftId)
                if (giftResponse) {
                    setGiftInfo(giftResponse)
                } else {
                    toast.error("Không thể tải thông tin quà tặng")
                }
            } catch (error) {
                console.error("Error fetching gift details:", error)
                toast.error("Không thể tải thông tin quà tặng")
            }
        }
        fetchGiftDetails()
    }, [location.search]);


    const handleSubmit = async (e) => {
        try {

            e.preventDefault()
            const giftRequestDTO = new FormData(e.target)
            giftRequestDTO.append('giftId', giftInfo.giftId)
            if (giftRequestDTO.get('newImageFile').size == 0) {
                giftRequestDTO.delete('newImageFile')
            }

            if (giftRequestDTO.get('newImageFile') == null) {
                if (!window.confirm(`Bạn đang sử dụng hình ảnh có sẵn`))
                    return
            }
            else {
                if (!window.confirm(`Xác nhận ghi đè hình ảnh có sẵn?`))
                    return
            }
            await updateGift(giftRequestDTO.get('giftId'), giftRequestDTO)
            toast.success("Thêm quà tặng thành công!");
        navigate('/manageGift');
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

            <StaffHeader />

            <div className="manage-content">
                <StaffSideBar />
                <div className="add-update-content-detail">
                    
                    {giftInfo ? (
                        <form onSubmit={handleSubmit}>
                            <div className="manage-form-input">
                            
                                {/* NAME */}
                                <div className="manage-form-group">
                                    <label>Tên quà tặng</label>
                                    <div className="manage-form-control">
                                        <input type="text" name="name" required defaultValue={giftInfo.name}></input>
                                    </div>
                                </div>

                                {/* PRICE */}
                                <div className="manage-form-group">
                                    <label>Điểm đổi quà</label>
                                    <div className="manage-form-control">
                                        <input type="number" name="point" step="1" min="0" required defaultValue={giftInfo.point}></input>
                                    </div>
                                </div>

                                {/* STOCK */}
                                <div className="manage-form-group">
                                    <label>Tồn kho</label>
                                    <div className="manage-form-control">
                                        <input type="number" name="stock" step="1" min="1" defaultValue={giftInfo.stock}></input>
                                    </div>
                                </div>

                                {/* IMAGE */}
                                <div className="manage-form-group">
                                    <label>Hình minh họa quà tặng</label>
                                    <div className="manage-form-control-img">
                                        <input name="newImageFile" type="file" accept=".png, .jpg"></input>
                                    </div>
                                </div>

                            </div>

                            {/* BUTTON */}
                            <div className="manage-form-btn">
                                <button className="save-manage-btn save-manage-link" type="submit">
                                    Lưu quà tặng
                                </button>

                                <div className="cancel-manage-btn">
                                    <button onClick={handleReload} className="cancel-manage-link">
                                        Đặt lại
                                    </button>
                                </div>

                            </div>

                        </form>
                    ) : (
                        <p>Đang tải thông tin quà tặng...</p>
                    )}
                </div>
            </div>
            <StaffBackToTop />
        </div>
    )
}