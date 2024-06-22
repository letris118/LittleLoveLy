package com.vtcorp.store.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.vtcorp.store.dtos.DistrictResponseDTO;
import com.vtcorp.store.dtos.ProvinceResponseDTO;
import com.vtcorp.store.dtos.WardResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GHNService {

    @Value("${ghn.api.url.production.province}")
    private String getProvinceUrl;

    @Value("${ghn.api.url.production.district}")
    private String getDistrictUrl;

    @Value("${ghn.api.url.production.ward}")
    private String getWardUrl;

    @Value("${ghn.api.url.production.calculate-fee}")
    private String calculateFeeUrl;

    @Value("${ghn.api.token.production}")
    private String apiProductionToken;

    @Value("${ghn.api.service-id}")
    private int serviceId;

    @Value("${ghn.api.from-district-id}")
    private int fromDistrictId;

    @Value("${ghn.api.from-ward-code}")
    private int fromWardCode;

    public ProvinceResponseDTO getProvinces() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiProductionToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<ProvinceResponseDTO> response = restTemplate.exchange(getProvinceUrl, HttpMethod.GET, entity, ProvinceResponseDTO.class);
        return response.getBody();
    }

    public DistrictResponseDTO getDistricts(int provinceId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiProductionToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(getDistrictUrl)
                .queryParam("province_id", provinceId);
        ResponseEntity<DistrictResponseDTO> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, DistrictResponseDTO.class);
        return response.getBody();
    }

    public WardResponseDTO getWards(int districtId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiProductionToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(getWardUrl)
                .queryParam("district_id", districtId);
        ResponseEntity<WardResponseDTO> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, WardResponseDTO.class);
        return response.getBody();
    }

    public Double calculateFee(int toDistrictId, int toWardCode, int weight) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiProductionToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(calculateFeeUrl)
                .queryParam("service_id", serviceId)
                .queryParam("from_district_id", fromDistrictId)
                .queryParam("from_ward_code", fromWardCode)
                .queryParam("weight", weight)
                .queryParam("to_district_id", toDistrictId)
                .queryParam("to_ward_code", toWardCode);
        ResponseEntity<JsonNode> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, JsonNode.class);
        JsonNode body = response.getBody();
        return (body != null && body.has("data") && body.get("data").has("total")) ? body.get("data").get("total").asDouble() : null;
    }
}
