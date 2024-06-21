package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.ArticleRequestDTO;
import com.vtcorp.store.dtos.ArticleResponseDTO;
import com.vtcorp.store.entities.Article;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    Article toEntity(ArticleRequestDTO articleRequestDTO);

    @Mapping(target = "articleId", ignore = true)
    void updateEntity(ArticleRequestDTO articleRequestDTO, @MappingTarget Article article);

    ArticleResponseDTO toResponseDTO(Article article);

    List<ArticleResponseDTO> toResponseDTOs(List<Article> articles);
}
