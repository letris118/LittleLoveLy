import React, { useEffect, useState } from "react";
import StaffHeader from "../components/StaffHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    dashboard,
    formatPrice,
    ordersAll,
    users
} from "../services/auth/UsersService";
import "../assets/css/homePage.css";
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
    Line
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



    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [yearState, setYearState] = useState(new Date().getFullYear());
    const [weekly, setWeekly] = useState(1)
    const [startDate, setStartDate] = useState(sevenDaysAgo)
    const [endDate, setEndDate] = useState(new Date())

    const dateTimeFormat = "dd-MM-yyyy HH:mm:ss"
    const dateFormat = "dd-MM-yyyy"



    const [selectedTypeTab, setSelectedTypeTab] = useState("REVENUE");
    const [selectedChartTab, setSelectedChartTab] = useState("YEARLY")

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
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Không thể tải dữ liệu");
            }
        };
        fetchAllData();
    }, []);

    const yearlyRevenueData = () => {
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
        const monthsToInclude = (yearState === currentYear) ? currentMonth + 1 : 12;
        const yearlySummary = months.slice(0, monthsToInclude).map(month => ({
            month,
            price: 0,
            numberOfOrders: 0,
            voucherApplied: 0,
            noVoucher: 0
        }));

        orderList.forEach(order => {
            const createdDate = parse(order.createdDate, dateTimeFormat, new Date())
            if (createdDate.getFullYear() == yearState) {
                const monthIndex = createdDate.getMonth();
                yearlySummary[monthIndex].price += order.postDiscountPrice;
                yearlySummary[monthIndex].numberOfOrders++;
                if (order.voucher)
                    yearlySummary[monthIndex].voucherApplied++
                else
                    yearlySummary[monthIndex].noVoucher++
            }
        });

        return yearlySummary;
    }

    const weeklyRevenueData = () => {

        const weeklySummary = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            weeklySummary.push({
                date: dateString,
                price: 0,
                numberOfOrders: 0,
                voucherApplied: 0,
                noVoucher: 0
            });
        }

        orderList.forEach(order => {
            const createdDate = parse(order.createdDate, dateTimeFormat, new Date());

            // Check if createdDate is within the date range
            if (createdDate >= startDate && createdDate <= endDate) {
                // Calculate day difference relative to startDate
                const dayDifference = Math.floor((createdDate - startDate) / (1000 * 60 * 60 * 24));

                if (dayDifference >= 0 && dayDifference < 7) {
                    weeklySummary[dayDifference].price += order.postDiscountPrice;
                    weeklySummary[dayDifference].numberOfOrders++
                    if (order.voucher)
                        weeklySummary[dayDifference].voucherApplied++
                    else
                        weeklySummary[dayDifference].noVoucher++
                }
            }
        });

        return weeklySummary;
    }

    const yearlyPaymentData = () => {
        const yearlySummary = [
            {
                name: 'Thanh toán khi nhận hàng',
                method: 'COD',
                numberOfOrders: 0,
                color: '#8884d8'
            },
            {
                name: 'Thanh toán bằng VnPay',
                method: 'ONLINE',
                numberOfOrders: 0,
                color: '#82ca9d'
            }
        ]

        orderList.forEach(order => {
            const createdDate = parse(order.createdDate, dateTimeFormat, new Date())
            if (createdDate.getFullYear() == yearState) {
                if (order.status.includes('COD')) {
                    const codMethod = yearlySummary.find(method => method.method === 'COD');
                    if (codMethod) {
                        codMethod.numberOfOrders += 1;
                    }
                } else if (order.status.includes('ONLINE')) {
                    const onlineMethod = yearlySummary.find(method => method.method === 'ONLINE');
                    if (onlineMethod) {
                        onlineMethod.numberOfOrders += 1;
                    }
                }
            }
        });
        return yearlySummary
    }

    const weeklyPaymentData = () => {
        const weeklySummary = [
            {
                name: 'Thanh toán khi nhận hàng',
                method: 'COD',
                numberOfOrders: 0,
                color: '#8884d8'
            },
            {
                name: 'Thanh toán bằng VnPay',
                method: 'ONLINE',
                numberOfOrders: 0,
                color: '#82ca9d'
            }
        ]

        orderList.forEach(order => {
            const createdDate = parse(order.createdDate, dateTimeFormat, new Date())
            if (createdDate >= startDate && createdDate <= endDate) {
                const dayDifference = Math.floor((createdDate - startDate) / (1000 * 60 * 60 * 24));
                if (dayDifference >= 0 && dayDifference < 7) {
                    if (order.status.includes('COD')) {
                        const codMethod = weeklySummary.find(method => method.method === 'COD');
                        if (codMethod) {
                            codMethod.numberOfOrders += 1;
                        }
                    } else if (order.status.includes('ONLINE')) {
                        const onlineMethod = weeklySummary.find(method => method.method === 'ONLINE');
                        if (onlineMethod) {
                            onlineMethod.numberOfOrders += 1;
                        }
                    }
                }
            }
        })

        return weeklySummary
    }


    const yearChange = (change) => {
        if (change === 'increase' && yearState < new Date().getFullYear())
            setYearState(yearState + 1)
        else if (change === 'decrease')
            setYearState(yearState - 1)
    }

    const weeklyChange = (change) => {
        let changedWeekly = weekly;

        if (change === 'increase') {
            changedWeekly += 1;
        } else if (change === 'decrease' && changedWeekly > 1) {
            changedWeekly -= 1;
        }

        setWeekly(changedWeekly);

        let start = new Date(Date.now() - (7 * changedWeekly - 1) * 24 * 60 * 60 * 1000);
        start.setHours(0, 0, 0, 0);
        let end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);

        if (changedWeekly !== 1) {
            end.setHours(23, 59, 59, 999);
        } else {
            end = new Date()
        }

        setStartDate(start);
        setEndDate(end);
    }


    const renderLabel = (pieData) => ({ name, value }) => {
        const totalValue = pieData.reduce((acc, item) => acc + item.numberOfOrders, 0);

        const percentage = ((value / totalValue) * 100).toFixed(2);
        return `${percentage}%`;
    };

    return (
        <div>
            <StaffHeader />
            <div className="manage-content">
                <AdminSideBar />
                {siteDashboard && orderList && (
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
                                    className={selectedChartTab === "YEARLY" ? "selected" : ""}
                                    onClick={() => handleChartClick("YEARLY")}>
                                    THEO NĂM
                                </button>
                                <button
                                    style={{
                                        marginRight: "15px",
                                        borderRadius: "10px",
                                        border: "1px solid rgb(67, 65, 65)",
                                    }}
                                    className={selectedChartTab === "WEEKLY" ? "selected" : ""}
                                    onClick={() => handleChartClick("WEEKLY")}>
                                    THEO TUẦN
                                </button>
                            </div>

                            {selectedChartTab === 'YEARLY' &&
                                <div>
                                    <button onClick={() => yearChange('decrease')}>GIẢM</button>
                                    <button onClick={() => yearChange('increase')}>TĂNG</button>
                                </div>
                            }

                            {selectedChartTab === 'WEEKLY' &&
                                <div>
                                    <button onClick={() => weeklyChange('increase')}><FcPrevious /></button>
                                    <button onClick={() => weeklyChange('decrease')}><FcNext /></button>
                                </div>
                            }

                            {selectedTypeTab === 'REVENUE' && selectedChartTab === 'YEARLY' &&
                                <>
                                    <div className="charts">
                                        <ResponsiveContainer width={1000} height={400} >
                                            <LineChart data={yearlyRevenueData()} >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" interval={0} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line name="Tổng số tiền" type="monotone" dataKey="price" stroke="#8884d8" strokeWidth="3" activeDot={{ r: 8 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <h5>Doanh thu trong năm {yearState}</h5>
                                </>

                            }

                            {selectedTypeTab === 'REVENUE' && selectedChartTab === 'WEEKLY' &&
                                <>
                                    <div className='charts'>
                                        <ResponsiveContainer width={1000} height={400} >
                                            <LineChart data={weeklyRevenueData()}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" interval={0} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line name="Tổng số tiền" type="monotone" dataKey="price" stroke="#8884d8" strokeWidth="3" activeDot={{ r: 8 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <h5>Doanh thu trong năm {startDate.getFullYear()}</h5>
                                </>
                            }

                            {selectedTypeTab === 'ORDER' && selectedChartTab === 'YEARLY' &&
                                <>
                                    <div className='charts'>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={yearlyRevenueData()}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="numberOfOrders" fill="#8884d8" name="Tổng số lượng đơn hàng" barSize="15" />
                                            </BarChart>

                                        </ResponsiveContainer>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={yearlyRevenueData()}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="voucherApplied" fill="#82ca9d" name="Đơn hàng có áp dụng voucher" barSize="15" />
                                                <Bar dataKey="noVoucher" fill="#ff7f50" name="Đơn hàng không áp dụng voucher" barSize="15" />
                                            </BarChart>

                                        </ResponsiveContainer>

                                    </div>
                                    <h5>Số lượng đơn hàng trong năm {yearState}</h5>
                                </>
                            }

                            {selectedTypeTab === 'ORDER' && selectedChartTab === 'WEEKLY' &&
                                <>
                                    <div className='charts'>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={weeklyRevenueData()}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" interval={0} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="numberOfOrders" fill="#8884d8" name="Tổng số lượng đơn hàng" barSize="20" />
                                            </BarChart>

                                        </ResponsiveContainer>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={weeklyRevenueData()}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" interval={0} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="voucherApplied" fill="#82ca9d" name="Đơn hàng có áp dụng voucher" barSize="20" />
                                                <Bar dataKey="noVoucher" fill="#ff7f50" name="Đơn hàng không áp dụng voucher" barSize="20" />
                                            </BarChart>

                                        </ResponsiveContainer>

                                    </div>
                                    <h5>Số lượng đơn hàng trong năm {startDate.getFullYear()}</h5>
                                </>
                            }


                            {selectedTypeTab === 'PAYMENT' && selectedChartTab === 'YEARLY' &&
                                <>

                                    <div className="charts">
                                        <ResponsiveContainer width="100%" height={400}>
                                            <PieChart>
                                                <Pie
                                                    data={yearlyPaymentData()}
                                                    dataKey="numberOfOrders"
                                                    nameKey="method"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    label={renderLabel(yearlyPaymentData())}
                                                >
                                                    {yearlyPaymentData().map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} name={entry.name} />
                                                    ))}

                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <h5>Phương thức thanh toán trong năm {yearState}</h5>
                                </>
                            }

                            {selectedTypeTab === 'PAYMENT' && selectedChartTab === 'WEEKLY' &&
                                <>

                                    <div className="charts">
                                        <ResponsiveContainer width="100%" height={400}>
                                            <PieChart>
                                                <Pie
                                                    data={weeklyPaymentData()}
                                                    dataKey="numberOfOrders"
                                                    nameKey="method"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    label={renderLabel(weeklyPaymentData())}
                                                >
                                                    {weeklyPaymentData().map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} name={entry.name} />
                                                    ))}

                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <h5>Phương thức thanh toán trong năm {startDate.getFullYear()}</h5>
                                    <h5>Từ ngày {new Date(startDate).toLocaleDateString('en-GB')} đến ngày {new Date(endDate).toLocaleDateString('en-GB')} </h5>

                                </>
                            }
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}