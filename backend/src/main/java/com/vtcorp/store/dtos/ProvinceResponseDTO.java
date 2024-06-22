package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProvinceResponseDTO {

    @JsonProperty("data")
    private List<ProvinceData> data;

    public static class ProvinceData {

        @JsonProperty("ProvinceID")
        private String ProvinceID;

        @JsonProperty("ProvinceName")
        private String ProvinceName;
    }
}
