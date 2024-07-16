package com.vtcorp.store.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.dtos.ProductRequestDTO;
import com.vtcorp.store.dtos.ReviewRequestDTO;
import com.vtcorp.store.jsonview.Views;
import com.vtcorp.store.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    @JsonView(Views.ProductManagementView.class)
    public ResponseEntity<?> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "-1") int size,
            @RequestParam(defaultValue = "productId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        try {
            Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            Pageable pageable;
            if (page == 0 && size == -1) {
                pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
            } else {
                pageable = PageRequest.of(page, size, sort);
            }
            return ResponseEntity.ok(productService.getAllProducts(pageable));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active products")
    @GetMapping
    @JsonView(Views.ProductBuyerView.class)
    public ResponseEntity<?> getActiveProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "-1") int size,
            @RequestParam(defaultValue = "productId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        try {
            Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            Pageable pageable;
            if (page == 0 && size == -1) {
                pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
            } else {
                pageable = PageRequest.of(page, size, sort);
            }
            return ResponseEntity.ok(productService.getActiveProducts(pageable));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get product by ID")
    @GetMapping("/{id}")
    @JsonView(Views.Product.class)
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get all products by brand ID")
    @GetMapping("/all/brand/{brandId}")
    @JsonView(Views.Product.class)
    public ResponseEntity<?> getAllProductsByBrand(@PathVariable Long brandId) {
        try {
            return ResponseEntity.ok(productService.getAllProductsByBrand(brandId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active products by brand ID")
    @GetMapping("/brand/{brandId}")
    @JsonView(Views.Product.class)
    public ResponseEntity<?> getActiveProductsByBrand(@PathVariable Long brandId) {
        try {
            return ResponseEntity.ok(productService.getActiveProductsByBrand(brandId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @Operation(summary = "Get all products by categories")
    @GetMapping("/all/category")
    @JsonView(Views.Product.class)
    public ResponseEntity<?> getAllProductsByCategories(@RequestParam List<Long> categoryIds) {
        try {
            return ResponseEntity.ok(productService.getAllProductsByCategories(categoryIds));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active products by categories")
    @GetMapping("/category")
    @JsonView(Views.Product.class)
    public ResponseEntity<?> getActiveProductsByCategories(@RequestParam List<Long> categoryIds) {
        try {
            return ResponseEntity.ok(productService.getActiveProductsByCategories(categoryIds));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get all products by search query")
    @GetMapping("/all/search")
    @JsonView(Views.ProductManagementView.class)
    public ResponseEntity<?> getAllProductsBySearchQuery(
            @RequestParam String searchQuery,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "-1") int size,
            @RequestParam(defaultValue = "productId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        try {
            Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            Pageable pageable;
            if (page == 0 && size == -1) {
                pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
            } else {
                pageable = PageRequest.of(page, size, sort);
            }
            return ResponseEntity.ok(productService.getAllProductsBySearchQuery(searchQuery, pageable));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active products by search query")
    @GetMapping("/search")
    @JsonView(Views.ProductBuyerView.class)
    public ResponseEntity<?> getActiveProductsBySearchQuery(
            @RequestParam String searchQuery,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "-1") int size,
            @RequestParam(defaultValue = "productId") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        try {
            Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            Pageable pageable;
            if (page == 0 && size == -1) {
                pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
            } else {
                pageable = PageRequest.of(page, size, sort);
            }
            return ResponseEntity.ok(productService.getActiveProductsBySearchQuery(searchQuery, pageable));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @Operation(summary = "Sort products by field and by ASC or DESC - Only for staff")
//    @GetMapping("/sort")
//    @JsonView(Views.Product.class)
//    public ResponseEntity<?> getAllProductsSortByNameAsc(@RequestParam String field, @RequestParam boolean isAsc) {
//        try {
//            return ResponseEntity.ok(productService.getAllProductsByFieldAndAscOrDesc(field, isAsc));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @Operation(summary = "Add product")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @JsonView(Views.Product.class)
    public ResponseEntity<?> addProduct(@ModelAttribute ProductRequestDTO productRequestDTO) {
        try {
            return ResponseEntity.ok(productService.addProduct(productRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "A user adds a review to the product page")
    @PostMapping(value = "/review", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @JsonView(Views.Product.class)
    public ResponseEntity<?> addReview(@ModelAttribute ReviewRequestDTO reviewRequestDTO) {
        try {
            return ResponseEntity.ok(productService.addReview(reviewRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update product by ID")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @JsonView(Views.Product.class)
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
