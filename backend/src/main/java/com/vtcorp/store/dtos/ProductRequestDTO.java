package com.vtcorp.store.dtos;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDTO {

    private long productId;
    private String name;
    private Double listedPrice;
    private Double sellingPrice;
    private String description;
    private Integer stock;

    private long brandId;
    private List<Long> categoryIds;
    private List<Long> imageIds;

    private List<MultipartFile> newImageFiles;
}