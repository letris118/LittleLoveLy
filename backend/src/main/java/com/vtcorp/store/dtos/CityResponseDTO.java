package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityResponseDTO {

    @JsonProperty("data")
    private List<CityData> data;

    public static class CityData {

        private String CityID;
        private String CityName;

        @JsonProperty("ProvinceID")
        public void setCityID(String cityID) {
            CityID = cityID;
        }

        @JsonProperty("ProvinceName")
        public void setCityName(String cityName) {
            CityName = cityName;
        }

        @JsonGetter("CityID")
        public String getCityID() {
            return CityID;
        }

        @JsonGetter("CityName")
        public String getCityName() {
            return CityName;
        }
    }
}
