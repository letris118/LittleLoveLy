import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import StaffHeader from "../components/StaffHeader"
import { toast } from "react-toastify"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
    getVoucherById,
    updateVoucher
} from "../services/auth/UsersService"
import StaffSideBar from "../components/StaffSideBar"
import "../assets/css/manage.css"
import StaffBackToTop from "../components/StaffBackToTop"

export default function UpdateVoucher() {
    const [voucherInfo, setVoucherInfo] = useState(null)
    const [selectedType, setSelectedType] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthentication = () => {
            const userRole = localStorage.getItem("userRole")
            if (!userRole || userRole !== "ROLE_STAFF") {
                navigate('/')
            }
        }
        checkAuthentication()

    }, [navigate])

    useEffect(() => {
        const fetchVoucherDetails = async () => {
            const queryParams = new URLSearchParams(location.search)
            const voucherId = queryParams.get('id')

            try {
                const voucherResponse = await getVoucherById(voucherId)
                if (voucherResponse) {
                    setVoucherInfo(voucherResponse)
                    setSelectedType(voucherResponse.type)
                    const [sday, smonth, syear] = voucherResponse.startDate.split('-')
                    const [eday, emonth, eyear] = voucherResponse.endDate.split('-')

                    setStartDate(new Date(`${syear}-${smonth}-${sday}`))
                    setEndDate(new Date(`${eyear}-${emonth}-${eday}`))
                } else {
                    toast.error("Không thể tải thông tin voucher!")
                }
            } catch (error) {
                console.error(error)
                toast.error("Không thể tải thông tin voucher!")
            }
        }

        fetchVoucherDetails()
    }, [location.search])

    const handleButtonClick = (type) => {
        setSelectedType(type)
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const voucherRequestDTO = new FormData(e.target)
            voucherRequestDTO.append('voucherId', voucherInfo.voucherId)
            voucherRequestDTO.append('type', selectedType)
            voucherRequestDTO.append('startDate', formatDate(startDate.toLocaleDateString('en-GB')))
            voucherRequestDTO.append('endDate', formatDate(endDate.toLocaleDateString('en-GB')))

            await updateVoucher(voucherRequestDTO.get('voucherId'), voucherRequestDTO)
            toast.success("Cập nhập voucher thành công!")
            navigate('/manage-voucher')

        } catch (error) {
            console.error(error)
            toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!")
        }
    }

    if (!voucherInfo) {
        return <div>Loading...</div>
    }
    const handleReload = (e) => {
        e.preventDefault()
        window.location.reload()
    }

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/')
        const monthAbbreviations = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
        const monthAbbreviation = monthAbbreviations[parseInt(month, 10) - 1]
        return `${day} ${monthAbbreviation} ${year}`
    }

    return (
        <div>
            <StaffHeader />
            <div className="manage-content">
                <StaffSideBar />
                <div className="add-update-content-detail">
                    {voucherInfo ? (
                        <form onSubmit={handleSubmit}>
                            <div className="manage-form-input">
                                <div className="manage-form-group">
                                    <label>Tên voucher</label>
                                    <div className="manage-form-control">
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            defaultValue={voucherInfo.title}>
                                        </input>
                                    </div>
                                </div>

                                <div className="manage-form-group">
                                    <label>Số lượng</label>
                                    <div className="manage-form-control">
                                        <input
                                            type="number"
                                            name="limit"
                                            step="1" min="0"
                                            defaultValue={voucherInfo.limit}>
                                        </input>
                                    </div>
                                </div>

                                <div className="manage-form-group">
                                    <label>Mô tả voucher</label>
                                    <div className="manage-form-control">
                                        <textarea
                                            name="description"
                                            required
                                            defaultValue={voucherInfo.description}
                                            style={{ resize: "none" }}>
                                        </textarea>
                                    </div>
                                </div>

                                <div className="manage-form-group">
                                    <label>Giá trị đơn hàng yêu cầu</label>
                                    <div className="manage-form-control">
                                        <input
                                            type="number"
                                            name="minOrderAmount"
                                            step="500" min="0"
                                            required
                                            defaultValue={voucherInfo.minOrderAmount}>
                                        </input>
                                    </div>
                                </div>

                                <div className="manage-form-group">
                                    <label>Phân loại</label>
                                    <div className="manage-form-type-voucher-control">
                                        <button
                                            style={{ marginRight: '15px', borderRadius: '10px', border: '1px solid rgb(67, 65, 65)' }}
                                            type="button"
                                            className={selectedType === 'FLAT' ? 'selected' : ''}
                                            onClick={() => handleButtonClick('FLAT')}
                                        >
                                            Giảm tiền hàng
                                        </button>
                                        <button
                                            style={{ marginRight: '15px', borderRadius: '10px', border: '1px solid rgb(67, 65, 65)' }}
                                            type="button"
                                            className={selectedType === 'PERCENTAGE' ? 'selected' : ''}
                                            onClick={() => handleButtonClick('PERCENTAGE')}
                                        >
                                            Giảm phần trăm tiền hàng
                                        </button>
                                        <button
                                            style={{ marginRight: '15px', borderRadius: '10px', border: '1px solid rgb(67, 65, 65)' }}
                                            type="button"
                                            className={selectedType === 'DISCOUNT_SHIPPING' ? 'selected' : ''}
                                            onClick={() => handleButtonClick('DISCOUNT_SHIPPING')}
                                        >
                                            Giảm phí giao hàng
                                        </button>
                                        <button
                                            style={{ marginRight: '15px', borderRadius: '10px', border: '1px solid rgb(67, 65, 65)' }}
                                            type="button"
                                            className={selectedType === 'FREE_SHIPPING' ? 'selected' : ''}
                                            onClick={() => handleButtonClick('FREE_SHIPPING')}
                                        >
                                            Miễn phí giao hàng
                                        </button>
                                    </div>
                                </div>

                                {selectedType === 'FLAT' && (
                                    <div className="manage-form-group">
                                        <label>Số tiền giảm</label>
                                        <div className="manage-form-control">
                                            <input
                                                type="number"
                                                name="discountAmount"
                                                step="500"
                                                min="0"
                                                required
                                                defaultValue={voucherInfo.discountAmount}
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedType === 'PERCENTAGE' && (
                                    <>
                                        <div className="manage-form-group">
                                            <label>Phần trăm giảm</label>
                                            <div className="manage-form-control">
                                                <input
                                                    type="number"
                                                    name="discountPercentage"
                                                    step="0.1"
                                                    min="0"
                                                    required
                                                    defaultValue={voucherInfo.discountPercentage}
                                                />
                                            </div>
                                        </div>
                                        <div className="manage-form-group">
                                            <label>Số tiền giảm tối đa</label>
                                            <div className="manage-form-control">
                                                <input
                                                    type="number"
                                                    name="maxDiscountAmount"
                                                    step="500"
                                                    min="0"
                                                    defaultValue={voucherInfo.maxDiscountAmount}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {selectedType === 'DISCOUNT_SHIPPING' && (
                                    <div className="manage-form-group">
                                        <label>Giảm phí giao hàng</label>
                                        <div className="manage-form-control">
                                            <input
                                                type="number"
                                                name="shipDiscountAmount"
                                                step="500"
                                                min="0"
                                                required
                                                defaultValue={voucherInfo.shipDiscountAmount}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="manage-form-group">
                                    <label>Ngày có hiệu lực</label>
                                    <div className="manage-form-control">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => {
                                                if (date <= endDate) {
                                                    setStartDate(date)
                                                } else {
                                                    toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc")
                                                }
                                            }}
                                            dateFormat="dd-MM-yyyy"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="manage-form-group">
                                    <label>Ngày hết hiệu lực</label>
                                    <div className="manage-form-control">
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => {
                                                if (date >= startDate) {
                                                    setEndDate(date)
                                                } else {
                                                    toast.error("Ngày kết thúc không được nhỏ hơn ngày bắt đầu")
                                                }
                                            }}
                                            dateFormat="dd-MM-yyyy"
                                            required
                                        />
                                    </div>
                                </div>

                            </div>

                           {/*  BUTTON */}
                           <div className="manage-form-btn">
                                <button className="save-manage-btn save-manage-link" type="submit">
                                    Lưu voucher
                                </button>
                                <div className="cancel-manage-btn">
                                    <button onClick={handleReload} className="cancel-manage-link">
                                        Đặt lại
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <p>Đang tải thông tin voucher...</p>
                    )}
                </div>
            </div>
            <StaffBackToTop />
        </div>
    )
}
