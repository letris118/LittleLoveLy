import React from 'react';
import { Helmet } from 'react-helmet';
import './StaffHomePage.css'; 

class StaffHomePage extends React.Component {
    render() {
        const navItems = [
            'Tài Khoản',
            'Quản Lí Đơn Hàng',
            'Quản Lí Sản Phẩm',
            'Quản Lí Bài Viết',
            'Mã Khuyến Mãi',
            'Chăm Sóc Khách Hàng',
            'Đăng Xuất'
        ];

        // Set document title
        document.title = 'Trang chủ';

        // link gg font
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Sevillana&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        return (
            <div>
                <header>
                    <div className="store-name">
                        <a href="staffHomePage.html" style={{ color: '#fff' }}>Little Lovely</a>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Tìm kiếm..." />
                        <button type="submit">Tìm</button>
                    </div>
                </header>
                <div className="content">
                    <div className="side-bar">
                        <div className="nav-bar">
                            {navItems.map((item, index) => (
                                <a key={index} href="" style={{ color: '#222f3e' }}>{item}</a>
                            ))}
                            <div className="content-detail"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StaffHomePage;
