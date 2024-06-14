package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.GiftDTO;
import com.vtcorp.store.entities.Gift;
import com.vtcorp.store.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/all")
    public List<Gift> getAllGifts() {
        return giftService.getAllGifts();
    }

    @GetMapping
    public List<Gift> getActiveGifts() {
        return giftService.getActiveGifts();
    }

    @GetMapping("/{id}")
    ResponseEntity<?> getGiftById(@PathVariable Long id) {
        Gift gift = giftService.getGiftById(id);
        if (gift == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gift);
    }

    @PostMapping
    ResponseEntity<?> addGift(@ModelAttribute GiftDTO giftDTO) {
        try {
            return ResponseEntity.ok(giftService.addGift(giftDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
