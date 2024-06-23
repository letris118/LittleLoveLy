package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DistrictResponseDTO {

    @JsonProperty("data")
    private List<DistrictData> data;

    public static class DistrictData {

        @JsonProperty("DistrictID")
        private String DistrictID;

        @JsonProperty("DistrictName")
        private String DistrictName;
    }
}
