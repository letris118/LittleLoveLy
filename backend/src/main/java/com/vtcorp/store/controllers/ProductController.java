package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.ProductDTO;
import com.vtcorp.store.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "Get all products")
    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        try {
            return ResponseEntity.ok(productService.getAllProducts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active products")
    @GetMapping
    public ResponseEntity<?> getActiveProducts() {
        try {
            return ResponseEntity.ok(productService.getActiveProducts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get product by ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Add product")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(@ModelAttribute ProductDTO productDTO) {
        try {
            return ResponseEntity.ok(productService.addProduct(productDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update product by ID")
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

    @Operation(summary = "Deactivate product by ID")
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<?> deactivateProduct(@PathVariable long id) {
        try {
            return ResponseEntity.ok(productService.deactivateProduct(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Activate product by ID")
    @PutMapping("/activate/{id}")
    public ResponseEntity<?> activateProduct(@PathVariable long id) {
        try {
            return ResponseEntity.ok(productService.activateProduct(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
