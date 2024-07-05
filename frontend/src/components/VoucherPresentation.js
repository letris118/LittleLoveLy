import React, { useEffect, useState } from "react";
import { vouchers } from "../services/auth/UsersService";
import "../assets/css/voucherPresentation.css";
import { Button, styled } from "@mui/material";

export default function VoucherPresentation({
  selectedVoucher,
  onSelectVoucher,
}) {
  const [voucherList, setVoucherList] = useState([]);

  const CustomButton = styled(Button)({
    background:
      "linear-gradient(90deg, rgba(255,0,132,1) 0%, rgba(255,99,132,1) 100%)",
    color: "white",
    borderRadius: "20px",
    fontWeight: "bold",
    padding: "5px 10px",
    textTransform: "none",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(255,0,132,0.8) 0%, rgba(255,99,132,0.8) 100%)",
    },
  });
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await vouchers();
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

  const handleApply = (voucherId) => {
    onSelectVoucher(voucherId === selectedVoucher ? null : voucherId);
  };

  return (
    <div className="voucher-container">
      {voucherList.map((voucher) => (
        <div className="voucher-item" key={voucher.voucherId}>
          <div className="voucher-item-left">
            <div
              className="voucher-name"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#AE0258",
              }}>
              {voucher.title}
            </div>
            <div className="voucher-description" style={{ fontSize: "12px" }}>
              {voucher.description}
            </div>
          </div>
          <div className="voucher-item-right">
            <CustomButton onClick={() => handleApply(voucher.voucherId)}>
              {selectedVoucher === voucher.voucherId ? "Hủy" : "Áp dụng"}
            </CustomButton>
          </div>
        </div>
      ))}
    </div>
  );
}