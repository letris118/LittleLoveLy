package com.vtcorp.store.dtos;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ArticleDTO {

    private long articleId;
    private String title;
    private Date uploadedDate = new Date();
    private String content;
    private boolean active = true;

    List<Long> productIds;
    List<MultipartFile> articleImages;
}