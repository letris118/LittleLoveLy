package com.vtcorp.store.dtos;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ArticleRequestDTO {

    private long articleId;
    private String title;
    private String content;

    List<Long> productIds;
}