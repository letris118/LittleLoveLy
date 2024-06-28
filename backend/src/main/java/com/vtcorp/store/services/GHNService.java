package com.vtcorp.store.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.vtcorp.store.dtos.DistrictResponseDTO;
import com.vtcorp.store.dtos.CityResponseDTO;
import com.vtcorp.store.dtos.ShippingResponseDTO;
import com.vtcorp.store.dtos.WardResponseDTO;
import com.vtcorp.store.entities.GiftIncluding;
import com.vtcorp.store.entities.Order;
import com.vtcorp.store.entities.OrderDetail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GHNService {

    @Value("${ghn.api.url.production.province}")
    private String getCityUrl;

    @Value("${ghn.api.url.production.district}")
    private String getDistrictUrl;

    @Value("${ghn.api.url.production.ward}")
    private String getWardUrl;

    @Value("${ghn.api.url.staging.calculate-fee}")
    private String calculateFeeUrl;

    @Value("${ghn.api.url.staging.create-order}")
    private String createOrderUrl;

    @Value("${ghn.api.token.production}")
    private String apiProductionToken;

    @Value("${ghn.api.token.staging}")
    private String apiStagingToken;

    @Value("${ghn.api.shop-id.staging}")
    private String shopId;

    @Value("${ghn.api.service-type-id}")
    private int serviceTypeId;

    @Value("${ghn.api.from-province-name}")
    private String fromProvinceName;

    @Value("${ghn.api.from-district-id}")
    private int fromDistrictId;

    @Value("${ghn.api.from-district-name}")
    private String fromDistrictName;

    @Value("${ghn.api.from-ward-code}")
    private int fromWardCode;

    @Value("${ghn.api.from-ward-name}")
    private String fromWardName;

    @Value("${ghn.api.weight}")
    private int weight;

    public CityResponseDTO getCities() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiProductionToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<CityResponseDTO> response = restTemplate.exchange(getCityUrl, HttpMethod.GET, entity, CityResponseDTO.class);
        return response.getBody();
    }

    public DistrictResponseDTO getDistricts(long cityId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiProductionToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(getDistrictUrl)
                .queryParam("province_id", cityId);
        ResponseEntity<DistrictResponseDTO> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, DistrictResponseDTO.class);
        return response.getBody();
    }

    public WardResponseDTO getWards(long districtId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiProductionToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(getWardUrl)
                .queryParam("district_id", districtId);
        ResponseEntity<WardResponseDTO> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, WardResponseDTO.class);
        return response.getBody();
    }

    public Double calculateFee(long toDistrictId, long toWardCode) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiStagingToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(calculateFeeUrl)
                .queryParam("service_type_id", serviceTypeId)
                .queryParam("from_district_id", fromDistrictId)
                .queryParam("from_ward_code", fromWardCode)
                .queryParam("weight", weight)
                .queryParam("to_district_id", toDistrictId)
                .queryParam("to_ward_code", toWardCode);
        ResponseEntity<JsonNode> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, JsonNode.class);
        JsonNode body = response.getBody();
        return (body != null && body.has("data") && body.get("data").has("total")) ? body.get("data").get("total").asDouble() : null;
    }

    public String getCityName(long cityId) {
        for (CityResponseDTO.CityData city : getCities().getData()) {
            if (city.getCityID().equals(String.valueOf(cityId))) {
                return city.getCityName();
            }
        }
        throw new IllegalArgumentException("Invalid city id");
    }

    public String getDistrictName(long cityId, long districtId) {
        for (DistrictResponseDTO.DistrictData district : getDistricts(cityId).getData()) {
            if (district.getDistrictID().equals(String.valueOf(districtId))) {
                return district.getDistrictName();
            }
        }
        throw new IllegalArgumentException("Invalid districtId of cityId");
    }

    public String getWardName(long districtId, long wardCode) {
        for (WardResponseDTO.WardData ward : getWards(districtId).getData()) {
            if (ward.getWardCode().equals(String.valueOf(wardCode))) {
                return ward.getWardName();
            }
        }
        throw new IllegalArgumentException("Invalid wardCode of districtId");
    }

    public ShippingResponseDTO createShipping(Order order, int codAmount, boolean isShopPayShip) {
        // Choose who pay shipping fee (1: Shop/Seller; 2: Buyer/Consignee)
        int paymentTypeId = isShopPayShip ? 1 : 2;

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiStagingToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<Map<String, Object>> items = getItems(order);

        Map<String, Object> params = new HashMap<>();
        params.put("shop_id", shopId);
        params.put("service_type_id", serviceTypeId);
        params.put("payment_type_id", paymentTypeId);
        params.put("required_note", "CHOXEMHANGKHONGTHU");
        params.put("to_name", order.getCusName());
        //params.put("to_phone", order.getCusPhone());
        params.put("to_phone", "0598482100");
        params.put("to_address", order.getCusStreet());
        params.put("to_ward_code", order.getCusWardCode().toString());
        params.put("from_ward_name", fromWardName);
        params.put("from_district_name", fromDistrictName);
        params.put("from_province_name", fromProvinceName);
        params.put("cod_amount", codAmount);
        params.put("weight", weight);
        params.put("items", items);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(params, headers);
        ResponseEntity<ShippingResponseDTO> response = restTemplate.postForEntity(createOrderUrl, entity, ShippingResponseDTO.class);
        return response.getBody();
    }

    private static List<Map<String, Object>> getItems(Order order) {
        List<Map<String, Object>> items = new ArrayList<>();
        for (OrderDetail orderDetail : order.getOrderDetails()) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", orderDetail.getProduct().getName());
            item.put("quantity", orderDetail.getQuantity());
            items.add(item);
        }
        for (GiftIncluding giftIncluding : order.getGiftIncludings()) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", giftIncluding.getGift().getName());
            item.put("quantity", giftIncluding.getQuantity());
            items.add(item);
        }
        return items;
    }
}
