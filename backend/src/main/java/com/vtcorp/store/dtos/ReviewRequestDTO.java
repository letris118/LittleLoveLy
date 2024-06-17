package com.vtcorp.store.dtos;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequestDTO {

    private long productId;
    private String username;

    private String feedback;
    private Integer star;
    private MultipartFile image;
}
