package com.vtcorp.store.dtos;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GiftRequestDTO {

    private long giftId;
    private String name;
    private Integer point;
    private Integer stock;
    private MultipartFile newImageFile;
}
