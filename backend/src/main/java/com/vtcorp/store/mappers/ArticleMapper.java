package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.ArticleDTO;
import com.vtcorp.store.entities.Article;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    Article toEntity(ArticleDTO articleDTO);

    @Mapping(target = "articleId", ignore = true)
    void updateEntity(ArticleDTO articleDTO, @MappingTarget Article article);

}
