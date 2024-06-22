package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.ProductRequestDTO;
import com.vtcorp.store.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get all products by categories")
    @GetMapping("/all/category")
    public ResponseEntity<?> getAllProductsByCategories(@RequestParam List<Long> categoryIds) {
        try {
            return ResponseEntity.ok(productService.getAllProductsByCategories(categoryIds));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active products by categories")
    @GetMapping("/category")
    public ResponseEntity<?> getActiveProductsByCategories(@RequestParam List<Long> categoryIds) {
        try {
            return ResponseEntity.ok(productService.getActiveProductsByCategories(categoryIds));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get all products by search query")
    @GetMapping("/all/search")
    public ResponseEntity<?> getAllProductsBySearchQuery(@RequestParam String searchQuery) {
        try {
            return ResponseEntity.ok(productService.getAllProductsBySearchQuery(searchQuery));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active products by search query")
    @GetMapping("/search")
    public ResponseEntity<?> getActiveProductsBySearchQuery(@RequestParam String searchQuery) {
        try {
            return ResponseEntity.ok(productService.getActiveProductsBySearchQuery(searchQuery));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Add product")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(@ModelAttribute ProductRequestDTO productRequestDTO) {
        try {
            return ResponseEntity.ok(productService.addProduct(productRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update product by ID")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @ModelAttribute ProductRequestDTO productRequestDTO) {
        if (id != productRequestDTO.getProductId()) {
            return ResponseEntity.badRequest().body("Product ID in the path variable does not match the one in the request body");
        }
        try {
            return ResponseEntity.ok(productService.updateProduct(productRequestDTO));
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
