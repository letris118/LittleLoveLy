package com.vtcorp.store.dtos.projections;

import com.vtcorp.store.entities.ProductImage;
import com.vtcorp.store.entities.ProductReview;

import java.util.List;

public interface ProductBuyerView {
    long getProductId();
    String getName();    
    Integer getNoSold();
    Double getSellingPrice();
    List<ProductReview> getProductReviews();
    List<ProductImage> getProductImages();
}
