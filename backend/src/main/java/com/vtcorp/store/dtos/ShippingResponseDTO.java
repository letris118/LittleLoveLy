package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ShippingResponseDTO {

    private int code;
    private String message;

    @JsonProperty("code_message")
    private String codeMessage;

    @JsonProperty("data")
    private OrderData data;

    @Data
    public static class OrderData {
        @JsonProperty("order_code")
        private String trackingCode;

        @JsonProperty("total_fee")
        private double totalFee;

        private Date expectedDeliveryTime;

        @JsonProperty("expected_delivery_time")
        public void setExpectedDeliveryTime(String expectedDeliveryTime) throws ParseException {
            SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
            isoFormat.setTimeZone(TimeZone.getTimeZone("Etc/GMT+7"));
            this.expectedDeliveryTime = isoFormat.parse(expectedDeliveryTime);
        }

        @JsonGetter("expected_delivery_time")
        public String getExpectedDeliveryTimeFormatted() {
            SimpleDateFormat desiredFormat = new SimpleDateFormat("dd/MM/yyyy, hh:mm a");
            return desiredFormat.format(this.expectedDeliveryTime);
        }
    }
}
