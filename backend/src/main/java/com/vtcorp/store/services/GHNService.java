package com.vtcorp.store.services;

import com.vtcorp.store.dtos.ProvinceResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GHNService {

    @Value("${ghn.api.url.production.province}")
    private String getProvinceUrl;

    @Value("${ghn.api.url.production.district}")
    private String getDistrictUrl;

    @Value("${ghn.api.url.production.ward}")
    private String getWardUrl;

    @Value("${ghn.api.token.production}")
    private String apiProductionToken;

    public ProvinceResponseDTO getProvinces() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", apiProductionToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<ProvinceResponseDTO> response = restTemplate.exchange(getProvinceUrl, HttpMethod.GET, entity, ProvinceResponseDTO.class);
        return response.getBody();
    }
}
