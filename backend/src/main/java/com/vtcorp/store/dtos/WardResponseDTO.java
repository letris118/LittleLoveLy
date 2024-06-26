package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WardResponseDTO {

    @JsonProperty("data")
    private List<WardData> data;

    @Getter
    public static class WardData {

        @JsonProperty("WardCode")
        private String WardCode;

        @JsonProperty("WardName")
        private String WardName;
    }
}
