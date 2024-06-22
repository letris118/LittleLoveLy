package com.vtcorp.store.services;

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
}
