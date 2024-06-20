package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.*;
import com.vtcorp.store.entities.ArticleImage;
import com.vtcorp.store.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponseDTO {
    private long articleId;
    private String title;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date uploadedDate;
    private String content;
    private boolean active;

    @JsonIgnoreProperties({"brand.products", "brand.categories",
            "categories", "articles", "orderDetails", "productReviews",
            "productImages.product"})
    private List<Product> products;

    @JsonIgnoreProperties("article")
    private List<ArticleImage> articleImages;
}
