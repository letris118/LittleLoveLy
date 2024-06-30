import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    const handleToggle = async (voucherId, currentStatus) => {
      if (currentStatus) {
        await deactivateVoucher(voucherId);
      } else {
        await activateVoucher(voucherId);
      }

      setVoucherList(prevState =>
        prevState.map(voucher =>
          voucher.voucherId === voucherId ? { ...voucher, active: !voucher.active } : voucher
        )
      );
  };

    return (
        <div>
          <StaffHeader/>
    
          <div className="manage-content">
            <StaffSideBar/>

            <div className="manage-content-detail">  

              <div className="search-add-table">
              <div className="table-search-bar">
                <input
                  type="text"
                  placeholder="Tìm kiếm voucher..."
                />
                <button className="table-search-icon">
                  <img src="../assets/images/search_icon.png" alt="search logo" />
                </button>
              </div>

              <div className="add-product-btn">
                <Link to={routes.addProduct} className="add-product-link">
                  Thêm voucher mới
                </Link>
              </div>
            </div>
 

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
                    <td className="active-body">
                      <Switch
                        onChange={() => handleToggle(voucher.voucherId, voucher.active)}
                        checked={voucher.active}
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



//     import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { routes } from "../routes";
// import StaffHeader from "../components/StaffHeader";
// import { ToastContainer, toast } from "react-toastify";
// import Switch from 'react-switch';
// import instance from "../services/auth/customize-axios";
// import {
//   vouchersAll,
//   deactivateVoucher,
//   activateVoucher,
// } from "../services/auth/UsersService";
// import StaffSideBar from "../components/StaffSideBar";
// import "../assets/css/manage.css";

// export default function ManageVoucher() {
//   const [voucherList, setVoucherList] = useState([]);
//   const [filteredVouchers, setFilteredVouchers] = useState([]);
//   const [sortBy, setSortBy] = useState(null); 
//   const [sortOrder, setSortOrder] = useState('asc'); 
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthentication = () => {
//       const userRole = localStorage.getItem("userRole");
//       if (!userRole || userRole !== "ROLE_STAFF") {
//         navigate('/');
//       }
//     };
//     checkAuthentication();

//     const fetchVouchers = async () => {
//       try {
//         let response = await vouchersAll();
//         if (response) {
//           let sortedVouchers = response.slice(0, 20); // Adjust as needed
//           setVoucherList(sortedVouchers);
//           setFilteredVouchers(sortedVouchers); // Initialize filtered list
//         } else {
//           setVoucherList([]);
//           setFilteredVouchers([]);
//         }
//       } catch (error) {
//         console.error("Error fetching vouchers:", error);
//         toast.error("Không thể tải voucher");
//         setVoucherList([]);
//         setFilteredVouchers([]);
//       }
//     };
//     fetchVouchers();
//   }, []);

//   const sortVouchers = (field) => {
//     let sortedVouchers = [...filteredVouchers];
//     sortedVouchers.sort((a, b) => {
//       if (field === 'title') {
//         return a.title.localeCompare(b.title);
//       } else if (field === 'limit') {
//         return a.limit - b.limit;
//       } else if (field === 'startDate') {
//         return new Date(a.startDate) - new Date(b.startDate);
//       } else if (field === 'endDate') {
//         return new Date(a.endDate) - new Date(b.endDate);
//       }
//       return 0;
//     });
//     if (sortOrder === 'desc') {
//       sortedVouchers.reverse();
//     }
//     setFilteredVouchers(sortedVouchers);
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('asc');
//     }
//     sortVouchers(field);
//   };

//   const handleToggle = async (voucherId, currentStatus) => {
//     if (currentStatus) {
//       await deactivateVoucher(voucherId);
//     } else {
//       await activateVoucher(voucherId);
//     }
//     setFilteredVouchers(prevState =>
//       prevState.map(voucher =>
//         voucher.voucherId === voucherId ? { ...voucher, active: !voucher.active } : voucher
//       )
//     );
//   };

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = voucherList.filter(voucher =>
//       voucher.title.toLowerCase().includes(query)
//     );
//     setFilteredVouchers(filtered);
//   };

//   return (
//     <div>
//       <StaffHeader/>
//       <div className="manage-content">
//         <StaffSideBar/>
//         <div className="manage-content-detail">
//           <div className="search-add-table">
//             <div className="table-search-bar">
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm voucher..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//               />
//               <button className="table-search-icon">
//                 <img src="../assets/images/search_icon.png" alt="search logo" />
//               </button>
//             </div>
//             <div className="add-product-btn">
//               <Link to={routes.addVoucher} className="add-product-link">
//                 Thêm voucher mới
//               </Link>
//             </div>
//           </div>
//           <table className="manage-table">
//             <thead>
//               <tr>
//                 <th className="index-head" style={{ width: '5%' }}>STT</th>
//                 <th className="name-head" style={{ width: '15%' }} onClick={() => handleSort('title')}>
//                   Tiêu đề
//                   {sortBy === 'title' && (
//                     <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
//                   )}
//                 </th>
//                 <th className="limit-head" style={{ width: '5%' }} onClick={() => handleSort('limit')}>
//                   Limit
//                   {sortBy === 'limit' && (
//                     <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
//                   )}
//                 </th>
//                 <th className="type-head" style={{ width: '9%' }}>Phân loại</th>
//                 <th className="description-head" style={{ width: '15%' }}>Miêu tả</th>
//                 <th className="startDate-head" style={{ width: '15%' }} onClick={() => handleSort('startDate')}>
//                   Ngày bắt đầu
//                   {sortBy === 'startDate' && (
//                     <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
//                   )}
//                 </th>
//                 <th className="endDate-head" style={{ width: '15%' }} onClick={() => handleSort('endDate')}>
//                   Ngày hết hạn
//                   {sortBy === 'endDate' && (
//                     <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
//                   )}
//                 </th>
//                 <th className="active-head" style={{ width: '9%' }}>Trạng thái</th>
//                 <th className="update-head" style={{ width: '9%' }}>Chỉnh sửa</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredVouchers.map((voucher, index) => (
//                 <tr key={voucher.voucherId}>
//                   <td className="index-body">{index + 1}</td>
//                   <td className="name-body">{voucher.title}</td>
//                   <td className="limit-body">{voucher.limit}</td>
//                   <td className="type-body">{voucher.type}</td>
//                   <td className="description-body">{voucher.description}</td>
//                   <td className="startDate-body">{voucher.startDate}</td>
//                   <td className="endDate-body">{voucher.endDate}</td>
//                   <td className="active-body">
//                     <Switch
//                       onChange={() => handleToggle(voucher.voucherId, voucher.active)}
//                       checked={voucher.active}
//                       offColor="#ff0000"
//                       onColor="#27ae60"
//                     />
//                   </td>
//                   <td className="update-body">
//                     <Link
//                       to={`${routes.updateVoucher}/${voucher.title}?id=${voucher.voucherId}`} 
//                       style={{ color: "#7f8c8d" }}>
//                       Chi tiết
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
