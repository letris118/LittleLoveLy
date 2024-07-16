package com.vtcorp.store.dtos.projections;

import com.vtcorp.store.entities.Brand;
import com.vtcorp.store.entities.ProductImage;

import java.util.Date;
import java.util.List;

public interface ProductManagementView {
    long getProductId();
    String getName();
    Integer getStock();
    Double getSellingPrice();
    boolean getActive();
    Date getLastModifiedDate();
    List<ProductImage> getProductImages();
    Brand getBrand();
}
