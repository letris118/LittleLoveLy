package com.vtcorp.store.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "article_image")
public class ArticleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "fk_article_id")
    private Article article;

}
