import { Button, DialogActions, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../assets/css/voucherPresentation.css";
import { getVouchersByUsername } from "../services/auth/UsersService";

export default function VoucherPresentation({
  initialVoucherId,
  basePrice,
  handleClose,
}) {
  const [voucherList, setVoucherList] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(initialVoucherId);

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
    "&.Mui-disabled": {
      background: "rgba(154, 149, 149, 0.817)",
      color: "white",
    },
  });

  const CustomCloseButton = styled(Button)({
    backgroundColor: "hotpink",
    color: "white",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(255,0,132,0.8) 0%, rgba(255,99,132,0.8) 100%)",
    },
    margin: "10px 0 5px 0",
    marginRight: "20px",
    borderRadius: "10px",
  });

  useEffect(() => {
    const fetchVouchers = async (username) => {
      try {
        const response = await getVouchersByUsername(username);
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

    const username = localStorage.getItem("username");
    if (username) {
      fetchVouchers(username);
    }
  }, []);

  const handleApply = (voucherId) => {
    setSelectedVoucher(voucherId === selectedVoucher ? null : voucherId);
  };

  return (
    <>
      <div className="voucher-container">
        {voucherList.map((voucher) => (
          <div
            className={`voucher-item ${
              basePrice < voucher.minOrderAmount ? "voucher-disabled" : ""
            }`}
            key={voucher.voucherId}>
            <div className="voucher-item-left">
              <div
                className="voucher-name"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}>
                {voucher.title}
              </div>
              <div className="voucher-description" style={{ fontSize: "12px" }}>
                {voucher.description}
              </div>
            </div>
            <div className="voucher-item-right">
              <CustomButton
                onClick={() => handleApply(voucher.voucherId)}
                disabled={basePrice < voucher.minOrderAmount}>
                {selectedVoucher === voucher.voucherId ? "Hủy" : "Áp dụng"}
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
      <DialogActions>
        <CustomCloseButton onClick={() => handleClose(selectedVoucher)}>
          {selectedVoucher !== initialVoucherId ? "Xác nhận thay đổi" : "Đóng"}
        </CustomCloseButton>
      </DialogActions>
    </>
  );
}
