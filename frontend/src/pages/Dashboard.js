import React, { useEffect, useState } from "react";
import StaffHeader from "../components/StaffHeader";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import {
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
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";
import { FcBusinessman, FcGlobe, FcMoneyTransfer, FcNext, FcPrevious, FcShipped } from "react-icons/fc";
import { parse } from 'date-fns'
import "../assets/css/dashboard.css"

export default function Dashboard() {
    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState([]);
    const [recentCustomerList, setRecentCustomerList] = useState([]);
    const [siteDashboard, setSiteDashboard] = useState(null);
    const [orderList, setOrderList] = useState([]);
    const [recentOrderList, setRecentOrderList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [voucherList, setVoucherList] = useState([]);


    const [yearState, setYearState] = useState(new Date().getFullYear());
    const [monthState, setMonthState] = useState(new Date().getMonth());
    const [daily, setDaily] = useState(1)

    const dateTimeFormat = "dd-MM-yyyy HH:mm:ss"
    const dateFormat = "dd-MM-yyyy"

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [selectedTypeTab, setSelectedTypeTab] = useState("REVENUE");
    const [selectedChartTab, setSelectedChartTab] = useState("MONTHLY")

    const handleTypeClick = (tab) => {
        setSelectedTypeTab(tab);
    };

    const handleChartClick = (tab) => {
        setSelectedChartTab(tab);
    }

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
                setCustomerList((await users()).filter((user) => user.role === "ROLE_CUSTOMER"));
                setRecentCustomerList((await users()).filter((user) => {
                    const registeredDate = parse(user.registeredDate, dateFormat, new Date())
                    return user.role === "ROLE_CUSTOMER" && registeredDate >= sevenDaysAgo
                }));
                setSiteDashboard(await dashboard());
                setOrderList(await ordersAll());
                setRecentOrderList((await ordersAll()).filter((order) => {
                    const createdDate = parse(order.createdDate, dateTimeFormat, new Date())
                    return createdDate >= sevenDaysAgo
                }))
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


    const monthlyRevenueData = (year) => {
        const months = [
            `Jan`,
            `Feb`,
            `Mar`,
            `Apr`,
            `May`,
            `Jun`,
            `Jul`,
            `Aug`,
            `Sep`,
            `Oct`,
            `Nov`,
            `Dec`,
        ];

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth(); // 0-based, so 0 is Jan and 11 is Dec
        const monthsToInclude = (year === currentYear) ? currentMonth + 1 : 12;

        const monthlySummary = months.slice(0, monthsToInclude).map(month => ({
            month,
            price: 0,
        }));

        orderList.forEach(order => {
            const createdDate = parse(order.createdDate, dateTimeFormat, new Date())
            if (createdDate.getFullYear() == year) {
                const monthIndex = createdDate.getMonth();
                monthlySummary[monthIndex].price += order.postDiscountPrice;
            }
        });

        const dailyRevenueData = (multiplier) => {
            const today = new Date();
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - 7 * multiplier + 1);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // Set endDate to 6 days after startDate
            endDate.setHours(23, 59, 59, 999);

            const dailySummary = [];

            for (let i = 0; i < 7; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);

                const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                dailySummary.push({ date: dateString, price: 0 });
            }

            orderList.forEach(order => {
                const createdDate = parse(order.createdDate, dateTimeFormat, new Date());

                // Check if createdDate is within the date range
                if (createdDate >= startDate && createdDate <= endDate) {
                    // Calculate day difference relative to startDate
                    const dayDifference = Math.floor((createdDate - startDate) / (1000 * 60 * 60 * 24));

                    if (dayDifference >= 0 && dayDifference < 7) {
                        dailySummary[dayDifference].price += order.postDiscountPrice;
                    }
                }
            });

            return dailySummary;
        }

        const monthlyPaymentData = (year) => {
            const monthlySummary = [
                {
                    method: 'COD',
                    numberOfOrders: 0
                },
                {
                    method: 'ONLINE',
                    numberOfOrders: 0
                }
            ]

            orderList.forEach(order => {
                if (order.status.includes('COD')) {
                    const codMethod = monthlySummary.find(method => method.method === 'COD');
                    if (codMethod) {
                        codMethod.numberOfOrders += 1;
                    }
                } else if (order.status.includes('ONLINE')) {
                    const onlineMethod = monthlySummary.find(method => method.method === 'ONLINE');
                    if (onlineMethod) {
                        onlineMethod.numberOfOrders += 1;
                    }
                }
            });
            return monthlySummary
        }

        const yearChange = (change) => {
            if (change === 'increase')
                setYearState(yearState + 1)
            else if (change === 'decrease')
                setYearState(yearState - 1)
        }

        const dailyChange = (change) => {
            if (change === 'increase')
                setDaily(daily + 1)
            else if (change === 'decrease' && daily >= 2)
                setDaily(daily - 1)
        }

        const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#8dd1e1', '#a4de6c', '#d0ed57'];


        const pieData = monthlyPaymentData(yearState).map((item, index) => ({
            name: item.method,
            value: item.numberOfOrders,
            color: COLORS[index % COLORS.length], // Assign a color from the COLORS array
        }));

        // Simple label formatter
        const renderLabel = ({ name, value }) => {
            const totalValue = pieData.reduce((acc, item) => acc + item.value, 0);

            const percentage = ((value / totalValue) * 100).toFixed(2);
            return `${name}: ${percentage}%`;
        };

        return (
            <div>
                <StaffHeader />

                <div className="manage-content">
                    <AdminSideBar />
                    {siteDashboard && (
                        <div className="manage-content-detail">
                            <main>
                                <div className="main-title">
                                    <h5>BẢNG THỐNG KÊ</h5>
                                    <h6>(Dữ liệu tổng hợp từ 7 ngày gần nhất)</h6>
                                </div>

                                <div className="main-cards">
                                    <div className="card">
                                        <div className="card-inner">
                                            <h5>TỔNG DOANH THU</h5>
                                            <FcMoneyTransfer className="card-icon" />
                                        </div>
                                        <h4>
                                            {formatPrice(
                                                recentOrderList.reduce(
                                                    (total, order) => total + order.postDiscountPrice,
                                                    0
                                                )
                                            )}
                                            đ
                                        </h4>
                                    </div>
                                    <div className="card">
                                        <div className="card-inner">
                                            <h5>KHÁCH HÀNG MỚI</h5>
                                            <FcBusinessman className="card-icon" />
                                        </div>
                                        <h4>{recentCustomerList.length}</h4>
                                    </div>
                                    <div className="card">
                                        <div className="card-inner">
                                            <h5>TỔNG ĐƠN HÀNG</h5>
                                            <FcShipped className="card-icon" />
                                        </div>
                                        <h4>{recentOrderList.length}</h4>
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
                                        className={selectedTypeTab === "REVENUE" ? "selected" : ""}
                                        onClick={() => handleTypeClick("REVENUE")}>
                                        DOANH THU
                                    </button>
                                    <button
                                        style={{
                                            marginRight: "15px",
                                            borderRadius: "10px",
                                            border: "1px solid rgb(67, 65, 65)",
                                        }}
                                        className={selectedTypeTab === "ORDER" ? "selected" : ""}
                                        onClick={() => handleTypeClick("ORDER")}>
                                        ĐƠN HÀNG
                                    </button>
                                    <button
                                        style={{
                                            marginRight: "15px",
                                            borderRadius: "10px",
                                            border: "1px solid rgb(67, 65, 65)",
                                        }}
                                        className={selectedTypeTab === "PAYMENT" ? "selected" : ""}
                                        onClick={() => handleTypeClick("PAYMENT")}>
                                        THANH TOÁN
                                    </button>
                                </div>

                                <div>
                                    <button
                                        style={{
                                            marginRight: "15px",
                                            borderRadius: "10px",
                                            border: "1px solid rgb(67, 65, 65)",
                                        }}
                                        className={selectedChartTab === "MONTHLY" ? "selected" : ""}
                                        onClick={() => handleChartClick("MONTHLY")}>
                                        THEO THÁNG
                                    </button>
                                    <button
                                        style={{
                                            marginRight: "15px",
                                            borderRadius: "10px",
                                            border: "1px solid rgb(67, 65, 65)",
                                        }}
                                        className={selectedChartTab === "DAILY" ? "selected" : ""}
                                        onClick={() => handleChartClick("DAILY")}>
                                        THEO NGÀY
                                    </button>
                                </div>

                                {selectedChartTab === 'MONTHLY' &&
                                    <div>
                                        <button onClick={() => yearChange('decrease')}>GIẢM</button>
                                        {yearState}
                                        <button onClick={() => yearChange('increase')}>TĂNG</button>
                                    </div>}

                                {selectedChartTab === 'DAILY' &&
                                    <div>
                                        <button onClick={() => dailyChange('increase')}><FcPrevious /></button>
                                        {daily}
                                        <button onClick={() => dailyChange('decrease')}><FcNext /></button>
                                    </div>}

                                {selectedTypeTab === 'REVENUE' && selectedChartTab === 'MONTHLY' &&
                                    <div className='charts'>

                                        <ResponsiveContainer width="100%" height={400}>
                                            <LineChart
                                                data={monthlyRevenueData(yearState)}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" interval={0} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke="#8884d8"
                                                    activeDot={{ r: 8 }}
                                                />
                                                <Line type="monotone" dataKey="" stroke="#82ca9d" />
                                            </LineChart>
                                            <h3>Monthly Revenue for {yearState}</h3> {/* Add your title here */}

                                        </ResponsiveContainer>
                                    </div>
                                }


                                {selectedTypeTab === 'REVENUE' && selectedChartTab === 'DAILY' &&
                                    <div className='charts'>

                                        <ResponsiveContainer width="100%" height={400}>
                                            <LineChart
                                                data={dailyRevenueData(daily)}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" interval={0} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                <Line type="monotone" dataKey="" stroke="#82ca9d" />
                                            </LineChart>

                                            <h3>Monthly Revenue for {yearState}</h3>

                                        </ResponsiveContainer>
                                    </div>
                                }

                                {selectedTypeTab === 'PAYMENT' && selectedChartTab === 'MONTHLY' &&
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            label={renderLabel}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>}
                            </main>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
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
</ResponsiveContainer>  */}
