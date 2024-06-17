package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.GiftDTO;
import com.vtcorp.store.entities.Gift;
import com.vtcorp.store.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.vtcorp.store.services.GiftService;

import java.util.List;

@RestController
@RequestMapping("/api/gifts")
public class GiftController {

    private final GiftService giftService;
    private final ProductService productService;

    @Autowired
    public GiftController(GiftService giftService, ProductService productService) {
        this.giftService = giftService;
        this.productService = productService;
    }

    @Operation(summary = "Get all gifts")
    @GetMapping("/all")
    public List<Gift> getAllGifts() {
        return giftService.getAllGifts();
    }

    @Operation(summary = "Get active gifts")
    @GetMapping
    public List<Gift> getActiveGifts() {
        return giftService.getActiveGifts();
    }

    @Operation(summary = "Get gift by ID")
    @GetMapping("/{id}")
    ResponseEntity<?> getGiftById(@PathVariable Long id) {
        Gift gift = giftService.getGiftById(id);
        if (gift == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gift);
    }

    @Operation(summary = "Add gift")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<?> addGift(@ModelAttribute GiftDTO giftDTO) {
        try {
            return ResponseEntity.ok(giftService.addGift(giftDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update gift by ID")
    @PutMapping
    ResponseEntity<?> updateGift(@PathVariable long id, @ModelAttribute GiftDTO giftDTO) {
        if (id != giftDTO.getGiftId()) {
            return ResponseEntity.badRequest().body("Gift ID in the path variable does not match the one in the request body");
        }
        try {
            return ResponseEntity.ok(giftService.updateGift(giftDTO));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
