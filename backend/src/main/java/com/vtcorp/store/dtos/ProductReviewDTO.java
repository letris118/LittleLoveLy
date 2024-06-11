package com.vtcorp.store.dtos;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;
//used for productdto
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductReviewDTO {

    private long productId;
    private String username;

    private String feedback;
    private Integer star;
    private MultipartFile image;
}
