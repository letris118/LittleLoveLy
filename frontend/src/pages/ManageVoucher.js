import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import Switch from 'react-switch';
import instance from "../services/auth/customize-axios";
import {
  vouchersAll,
  deactivateVoucher,
  activateVoucher,
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop"
export default function ManageVoucher() {
  const [voucherList, setVoucherList] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate('/');
      }
    };
    checkAuthentication();
    if (location.state && location.state.success) {
      toast.success(location.state.success);
      // Clear the state to prevent the message from showing again on page reload
      navigate(location.pathname, { replace: true, state: {} });
    }

    const fetchVouchers = async () => {
      try {
        let response = await vouchersAll();
        if (response) {
          setVoucherList(response);
          setFilteredVouchers(response);
        } else {
          setVoucherList([]);
          setFilteredVouchers([]);
        }
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        toast.error("Không thể tải voucher");
        setVoucherList([]);
        setFilteredVouchers([]);
      }
    };
    fetchVouchers();
  }, []);

  const handleToggle = async (voucherId, currentStatus) => {
    if (currentStatus) {
      await deactivateVoucher(voucherId);
    } else {
      await activateVoucher(voucherId);
    }

    setFilteredVouchers(prevState =>
      prevState.map(voucher =>
        voucher.voucherId === voucherId ? { ...voucher, active: !voucher.active } : voucher
      )
    );
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = voucherList.filter(voucher =>
      voucher.title && voucher.title.toLowerCase().includes(query)
    );
    setFilteredVouchers(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSort = (field) => {
    const isAsc = sortBy === field && sortOrder === 'asc';
    setSortBy(field);
    setSortOrder(isAsc ? 'desc' : 'asc');

    const sorted = [...filteredVouchers].sort((a, b) => {
      let valueA = a[field] ?? '';
      let valueB = b[field] ?? '';

      if (field === 'startDate' || field === 'endDate') {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredVouchers(sorted);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVouchers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);

  return (
    <div>

      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar />
        <div className="manage-content-detail">
          <div className="search-add-table">
            <div className="table-search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm voucher..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="add-product-btn">
              <Link to={routes.addVoucher} className="add-product-link">
                Thêm voucher mới
              </Link>
            </div>
          </div>
          <table className="manage-table">
            <thead>
              <tr>
                <th className="index-head" style={{ width: '5%' }}>STT</th>
                <th className="name-head" style={{ width: '15%' }}>Tiêu đề</th>
                <th className="limit-head" style={{ width: '5%' }} onClick={() => handleSort('limit')}>
                  Limit
                  {sortBy === 'limit' && (
                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="type-head" style={{ width: '9%' }}>Phân loại</th>
                <th className="description-head" style={{ width: '15%' }}>Miêu tả</th>
                <th className="startDate-head" style={{ width: '15%' }} onClick={() => handleSort('startDate')}>
                  Ngày bắt đầu
                  {sortBy === 'startDate' && (
                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="endDate-head" style={{ width: '15%' }} onClick={() => handleSort('endDate')}>
                  Ngày hết hạn
                  {sortBy === 'endDate' && (
                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="active-head" style={{ width: '11%' }} onClick={() => handleSort('active')}>
                  Trạng thái
                  {sortBy === 'active' && (
                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="update-head" style={{ width: '9%' }}>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((voucher, index) => (
                  <tr key={voucher.voucherId}>
                    <td className="index-body">{indexOfFirstItem + index + 1}</td>
                    <td className="name-body">{voucher.title ?? 'N/A'}</td>
                    <td className="limit-body">{voucher.limit ?? 'N/A'}</td>
                    <td className="type-body">{voucher.type ?? 'N/A'}</td>
                    <td className="description-body">{voucher.description ?? 'N/A'}</td>
                    <td className="startDate-body">{voucher.startDate ?? 'N/A'}</td>
                    <td className="endDate-body">{voucher.endDate ?? 'N/A'}</td>
                    <td className="active-body">
                      <Switch
                        onChange={() => handleToggle(voucher.voucherId, voucher.active)}
                        checked={voucher.active ?? false}
                        offColor="#ff0000"
                        onColor="#27ae60"
                      />
                    </td>
                    <td className="update-body">
                      <Link to={`${routes.updateVoucher}/${voucher.title}?id=${voucher.voucherId}`}
                        className="update-link">
                        Chi tiết
                      </Link>
                    </td>
                  </tr>

                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Không có voucher nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="manage-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={i + 1 === currentPage ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
