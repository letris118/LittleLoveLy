package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.GiftRequestDTO;
import com.vtcorp.store.entities.Gift;
import com.vtcorp.store.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.vtcorp.store.services.GiftService;

@RestController
@RequestMapping("/api/gifts")
public class GiftController {

    private final GiftService giftService;

    @Autowired
    public GiftController(GiftService giftService, ProductService productService) {
        this.giftService = giftService;
    }

    @Operation(summary = "Get all gifts")
    @GetMapping("/all")
    public ResponseEntity<?> getAllGifts() {
        try{
            return ResponseEntity.ok(giftService.getAllGifts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active gifts")
    @GetMapping
    public ResponseEntity<?> getActiveGifts() {
        try{
            return ResponseEntity.ok(giftService.getActiveGifts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get gift by ID")
    @GetMapping("/{id}")
    ResponseEntity<?> getGiftById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(giftService.getGiftById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Add gift")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<?> addGift(@ModelAttribute GiftRequestDTO giftRequestDTO) {
        try {
            return ResponseEntity.ok(giftService.addGift(giftRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update gift by ID")
    @PutMapping(value = "{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<?> updateGift(@PathVariable long id, @ModelAttribute GiftRequestDTO giftRequestDTO) {
        if (id != giftRequestDTO.getGiftId()) {
            return ResponseEntity.badRequest().body("Gift ID in the path variable does not match the one in the request body");
        }
        try {
            return ResponseEntity.ok(giftService.updateGift(giftRequestDTO));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Deactivate gift by ID")
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<?> deactivateGift(@PathVariable long id) {
        try {
            return ResponseEntity.ok(giftService.deactivateProduct(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Activate gift by ID")
    @PutMapping("/activate/{id}")
    public ResponseEntity<?> activateGift(@PathVariable long id) {
        try {
            return ResponseEntity.ok(giftService.activateProduct(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
