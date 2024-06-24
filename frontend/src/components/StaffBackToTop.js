import React, { useState, useEffect } from 'react';
import "../assets/css/manage.css";


function StaffBackToTop() {
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 300) {
        setShowTopButton(true);
        } else {
        setShowTopButton(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    };

    return (
    <>
        {showTopButton && (
        <button className="staff-back-to-top" onClick={scrollToTop}>
            ↑
        </button>
        )}
    </>
    );
}

export default StaffBackToTop;