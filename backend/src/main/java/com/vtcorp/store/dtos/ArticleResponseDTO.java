package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.*;
import com.vtcorp.store.entities.ArticleImage;
import com.vtcorp.store.entities.Product;
import com.vtcorp.store.jsonview.Views;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponseDTO {

    @JsonView(Views.Article.class)
    private long articleId;
    @JsonView(Views.Article.class)

    private String title;

    @JsonView(Views.Article.class)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date uploadedDate;

    @JsonView(Views.Article.class)
    private String content;

    @JsonView(Views.Article.class)
    private boolean active;

    @JsonView(Views.Article.class)
    private List<Product> products;

    @JsonView(Views.Article.class)
    private List<ArticleImage> articleImages;

}
