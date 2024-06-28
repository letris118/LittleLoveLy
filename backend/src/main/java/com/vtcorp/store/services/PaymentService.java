package com.vtcorp.store.services;

import com.nimbusds.jose.shaded.gson.JsonObject;
import com.vtcorp.store.config.VNPayConfig;
import com.vtcorp.store.dtos.PaymentResponseDTO;
import com.vtcorp.store.utils.CodeGenerator;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentService {

    public PaymentResponseDTO createPayment(String orderId, double price, String ipAddress, Date CreatedDate) {
        long amount = Math.round(price * 100.0);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_IpAddr", ipAddress);
        vnp_Params.put("vnp_TxnRef", orderId);
        vnp_Params.put("vnp_OrderInfo", "ThanhToanDonHang_" + orderId);
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(CreatedDate);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        cld.setTime(CreatedDate);
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        return new PaymentResponseDTO("00", "success", paymentUrl);
    }

    public String refundPayment(String orderId, boolean isFullRefund, double amountRefund, String ipAddress, Date CreatedDate, String createdBy) {
        String vnp_TransactionType = isFullRefund ? "02" : "03";
        long amount = Math.round(amountRefund * 100.0);

        String vnp_RequestId = CodeGenerator.generateRandomCode(8);
        String vnp_Version = VNPayConfig.vnp_Version;
        String vnp_Command = "refund";
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String vnp_TxnRef = orderId;
        String vnp_Amount = String.valueOf(amount);
        String vnp_OrderInfo = "HoantienGDOrderId_" + vnp_TxnRef;
        String vnp_CreateBy = createdBy;
        String vnp_IpAddr = ipAddress;
        String vnp_TransactionNo = "";

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        String vnp_TransactionDate = formatter.format(CreatedDate);

        JsonObject vnp_Params = new JsonObject();
        vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
        vnp_Params.addProperty("vnp_Version", vnp_Version);
        vnp_Params.addProperty("vnp_Command", vnp_Command);
        vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.addProperty("vnp_TransactionType", vnp_TransactionType);
        vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.addProperty("vnp_Amount", vnp_Amount);
        vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.addProperty("vnp_TransactionNo", "{get value of vnp_TransactionNo}");
        vnp_Params.addProperty("vnp_TransactionDate", vnp_TransactionDate);
        vnp_Params.addProperty("vnp_CreateBy", vnp_CreateBy);
        vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

        String hash_Data = String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode,
                vnp_TransactionType, vnp_TxnRef, vnp_Amount, vnp_TransactionNo, vnp_TransactionDate,
                vnp_CreateBy, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);

        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hash_Data);

        vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

        try {
            URL url = new URL(VNPayConfig.vnp_ApiUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(vnp_Params.toString());
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();
            System.out.println("nSending 'POST' request to URL : " + url);
            System.out.println("Post Data : " + vnp_Params);
            System.out.println("Response Code : " + responseCode);
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String output;
            StringBuffer response = new StringBuffer();
            while ((output = in.readLine()) != null) {
                response.append(output);
            }
            in.close();
            System.out.println(response.toString());
            return response.toString();
        } catch (IOException e) {
            return e.getMessage();
        }
    }

//    public String queryPayment(String orderId, Date transDate, String ipAddress) {
//
//        String vnp_RequestId = CodeGenerator.generateRandomCode(8);
//        String vnp_Version = VNPayConfig.vnp_Version;
//        String vnp_Command = "querydr";
//        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
//        String vnp_TxnRef = orderId;
//        String vnp_OrderInfo = "KiemtraketquaGDOrderId_" + vnp_TxnRef;
//        String vnp_IpAddr = ipAddress;
//
//        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//        String vnp_CreateDate = formatter.format(cld.getTime());
//        String vnp_TransDate = formatter.format(transDate);
//
//        JsonObject vnp_Params = new JsonObject();
//        vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
//        vnp_Params.addProperty("vnp_Version", vnp_Version);
//        vnp_Params.addProperty("vnp_Command", vnp_Command);
//        vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
//        vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
//        vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);
//        vnp_Params.addProperty("vnp_TransactionDate", vnp_TransDate);
//        vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
//        vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);
//
//        String hash_Data = String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode, vnp_TxnRef, vnp_TransDate, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);
//        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hash_Data);
//
//        vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);
//
//        try {
//            URL url = new URL(VNPayConfig.vnp_ApiUrl);
//            HttpURLConnection con = (HttpURLConnection) url.openConnection();
//            con.setRequestMethod("POST");
//            con.setRequestProperty("Content-Type", "application/json");
//            con.setDoOutput(true);
//            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
//            wr.writeBytes(vnp_Params.toString());
//            wr.flush();
//            wr.close();
//            int responseCode = con.getResponseCode();
//            System.out.println("nSending 'POST' request to URL : " + url);
//            System.out.println("Post Data : " + vnp_Params);
//            System.out.println("Response Code : " + responseCode);
//            BufferedReader in = new BufferedReader(
//                    new InputStreamReader(con.getInputStream()));
//            String output;
//            StringBuffer response = new StringBuffer();
//            while ((output = in.readLine()) != null) {
//                response.append(output);
//            }
//            in.close();
//            System.out.println(response.toString());
//            return response.toString();
//        } catch (IOException e) {
//            return e.getMessage();
//        }
//    }
}