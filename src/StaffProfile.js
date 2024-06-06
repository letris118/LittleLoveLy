import React from 'react';
import '../assets/css/Staff.css'; 
import { routes } from "../routes";
import {Link}from 'react-router-dom' 
//import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function StaffHomePage() {
   
        //const navigate = useNavigate();
        

        useEffect(() => {
            // Set document title
            document.title = 'Tài Khoản';
    
            // Link Google Font
            const fontLink1 = document.createElement('link');
            fontLink1.href = 'https://fonts.googleapis.com/css2?family=Sevillana&display=swap';
            fontLink1.rel = 'stylesheet';
            document.head.appendChild(fontLink1);

            const fontLink2 = document.createElement('link');
            fontLink2.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap';
            fontLink2.rel = 'stylesheet';
            document.head.appendChild(fontLink2);
    
            // Clean up function to remove the font link when the component unmounts
            return () => {
                document.head.removeChild(fontLink1);
                document.head.removeChild(fontLink2);
            };
        }, []);

        

        return (
            <div>                
                <header>
                    {/* logo + store name to return home page */}
                    <div className="store-name">
                        <Link to={routes.StaffHomePage} style={{ color: '#fff' }}>Little Lovely</Link>
                    </div>           
                </header>

                {/* navigation bar + home page content*/}
                <div className="content">

                    {/* navigation bar*/}
                    <div className="side-bar">
                        <div className="nav-bar">
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Tài Khoản</Link>       
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Quản Lý Đơn Hàng</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Quản Lý Sản Phẩm</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Quản Lý Bài Viết</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Quản Lý Voucher</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Chăm Sóc Khách Hàng</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Đăng Xuất</Link>
                        </div>                   
                    </div>
                    
                    
                    <div className="profile">

                        {/* avatar*/}
                        <div className="avatar">
                            <img src="path/to/placeholder/avatar.png" alt="" />   
                        </div>

                        {/* infomation box*/}
                        <div className="info">
                                            
                        </div>

                        {/* button to update profile*/}
                        <div className="update-info">
                            <button>Sửa Thông Tin</button>
                        </div>
                    
                    </div>

                </div>

            </div>
        );
    }

