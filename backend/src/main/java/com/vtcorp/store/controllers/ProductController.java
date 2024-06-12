package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.ProductDTO;
import com.vtcorp.store.services.ProductService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getActiveProducts() {
        try {
            return ResponseEntity.ok(productService.getActiveProducts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        try {
            return ResponseEntity.ok(productService.getAllProducts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(@ModelAttribute ProductDTO productDTO) {
        try {
            return ResponseEntity.ok(productService.saveProduct(productDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(@PathVariable long id, @ModelAttribute ProductDTO productDTO) {
        if (id != productDTO.getProductId()) {
            return ResponseEntity.badRequest().body("Product ID in the path variable does not match the one in the request body");
        }
        try {
            return ResponseEntity.ok(productService.updateProduct(productDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
