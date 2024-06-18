package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.ReviewRequestDTO;
import com.vtcorp.store.entities.ProductReview;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductReviewMapper {

    ProductReview toEntity(ReviewRequestDTO reviewRequestDTO);
}
