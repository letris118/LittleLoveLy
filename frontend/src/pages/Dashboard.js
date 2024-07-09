import React, { useEffect, useState } from "react";
import StaffHeader from "../components/StaffHeader";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import {
  articlesAll,
  brands,
  categories,
  dashboard,
  formatPrice,
  ordersAll,
  productsAll,
  users,
  vouchersAll,
} from "../services/auth/UsersService";
import BrandPresentation from "../components/BrandPresentation";
import "../assets/css/homePage.css";
import ProductPresentation from "../components/ProductPresentation";
import AdminSideBar from "../components/AdminSideBar";
import StaffBackToTop from "../components/StaffBackToTop";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
  BsFillGrid3X3GapFill,
  BsFillArchiveFill,
  BsPeopleFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FcGlobe, FcMoneyTransfer, FcShipped } from "react-icons/fc";
import { parse } from 'date-fns'
import "../assets/css/dashboard.css"

export default function Dashboard() {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [siteDashboard, setSiteDashboard] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [voucherList, setVoucherList] = useState([]);

  const [selectedTab, setSelectedTab] = useState("REVENUE");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_ADMIN") {
        navigate("/");
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setArticleList(await articlesAll());
        setBrandList(await brands());
        setCategoryList(await categories());
        setCustomerList(
          (await users()).filter((user) => user.role === "ROLE_CUSTOMER")
        );
        setSiteDashboard(await dashboard());
        setOrderList(await ordersAll());
        setProductList(await productsAll());
        setStaffList(
          (await users()).filter((user) => user.role === "ROLE_STAFF")
        );
        setVoucherList(await vouchersAll());
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Không thể tải dữ liệu");
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    setProduct(productList.slice(0, 5));
  }, [productList]);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const dateFormat = "dd-MM-yyyy HH:mm:ss"

  const monthlyRevenueData = (year) => {
    const months = [
      `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`,
    ]

    const monthlySummary = months.map(month => ({
      month,
      price: 0
    }))
    orderList.forEach(order => {
      const createdDate = parse(order.createdDate, dateFormat, new Date())
      if (createdDate.getFullYear() == year) {
        const monthIndex = createdDate.getMonth()
        monthlySummary[monthIndex].price += order.postDiscountPrice
      }
    })

    return monthlySummary
  }


  return (
    <div>
      <StaffHeader />

      <div className="manage-content">
        <AdminSideBar />
        {siteDashboard && (
          <div className="manage-content-detail">
            <main>
              <div className='main-title'>
                <h5>BẢNG THỐNG KÊ</h5>
              </div>

              <div className="main-cards">
                <div className="card">
                  <div className="card-inner">
                    <h5>TỔNG DOANH THU</h5>
                    <FcMoneyTransfer className="card-icon" />
                  </div>
                  <h4>
                    {formatPrice(
                      orderList.reduce(
                        (total, order) => total + order.postDiscountPrice,
                        0
                      )
                    )}
                    đ
                  </h4>
                </div>
                <div className="card">
                  <div className="card-inner">
                    <h5>TỔNG LỢI NHUẬN</h5>
                    <FcMoneyTransfer className="card-icon" />
                  </div>
                  <h4>{productList.length}</h4>
                </div>
                <div className="card">
                  <div className="card-inner">
                    <h5>TỔNG ĐƠN HÀNG</h5>
                    <FcShipped className="card-icon" />
                  </div>
                  <h4>{orderList.length}</h4>
                </div>
                <div className="card">
                  <div className="card-inner">
                    <h5>LƯỢT TRUY CẬP</h5>
                    <FcGlobe className="card-icon" />
                  </div>
                  <h4>{siteDashboard.siteVisits}</h4>
                </div>
              </div>

              <div>
                <button
                  style={{
                    marginRight: "15px",
                    borderRadius: "10px",
                    border: "1px solid rgb(67, 65, 65)",
                  }}
                  type="button"
                  className={selectedTab === "REVENUE" ? "selected" : ""}
                  onClick={() => handleTabClick("REVENUE")}>
                  DOANH THU
                </button>
                <button
                  style={{
                    marginRight: "15px",
                    borderRadius: "10px",
                    border: "1px solid rgb(67, 65, 65)",
                  }}
                  type="button"
                  className={selectedTab === "FLAT" ? "selected" : ""}
                  onClick={() => handleTabClick("ORDER")}>
                  ĐƠN HÀNG
                </button>
                <button
                  style={{
                    marginRight: "15px",
                    borderRadius: "10px",
                    border: "1px solid rgb(67, 65, 65)",
                  }}
                  type="button"
                  className={selectedTab === "FLAT" ? "selected" : ""}
                  onClick={() => handleTabClick("VISIT")}>
                  LƯỢT TRUY CẬP
                </button>
              </div>

              {selectedTab === 'REVENUE' &&
                <div className='charts'>
                  {/* <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={productList}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="productId" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="listedPrice" fill="#8884d8" />
                      <Bar dataKey="sellingPrice" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer> */}

                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={monthlyRevenueData('2024')}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" interval={0} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="" stroke="#82ca9d" />
                    </LineChart>
                    <h3>Monthly Revenue for 2024</h3> {/* Add your title here */}

                  </ResponsiveContainer>
                </div>
              }
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
