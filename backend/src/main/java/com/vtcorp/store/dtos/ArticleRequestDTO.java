package com.vtcorp.store.dtos;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ArticleRequestDTO {

    private long articleId;
    private String title;
    private String content;

    List<Long> productIds;
    List<Long> imageIds;
    List<MultipartFile> newImageFiles;
}