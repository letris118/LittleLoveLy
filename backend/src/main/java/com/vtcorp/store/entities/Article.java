package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long articleId;
    private String title;
    private Date uploadedDate;
    private String content;
    private boolean active;

    @JsonIgnoreProperties({"articles", "orderDetails", "productReviews"})
    @ManyToMany
    @JoinTable(name = "product_featuring",
            joinColumns = @JoinColumn(name = "fk_article_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_product_id"))
    private List<Product> products;

    @JsonIgnoreProperties("article")
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ArticleImage> articleImages;

}
