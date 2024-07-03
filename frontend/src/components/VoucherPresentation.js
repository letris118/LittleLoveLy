import React, { useEffect, useState } from "react";
import { formatPrice, vouchers } from "../services/auth/UsersService";

export default function VoucherPresentation() {
  const [voucherList, setVoucherList] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        let response = await vouchers();
        if (response) {
          setVoucherList(response);
        } else {
          setVoucherList([]);
        }
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        setVoucherList([]);
      }
    };
    fetchVouchers();
  }, []);
  return (
    <div className="voucher-container">
      {voucherList.map((voucher) => (
        <div className="voucher-item" key={voucher.voucherId}>
          <div className="voucher-item-left">
            <p>{formatPrice(voucher.discountAmount)}đ</p>
            <p className="voucher-description">{voucher.description}</p>
          </div>
          <div className="voucher-item-right">
            <p className="voucher-name">{voucher.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
