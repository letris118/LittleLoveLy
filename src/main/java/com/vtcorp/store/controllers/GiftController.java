package com.vtcorp.store.controllers;

import com.vtcorp.store.entities.Gift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vtcorp.store.services.GiftService;

import java.util.List;

@RestController
@RequestMapping("/api/gifts")
public class GiftController {

    private final GiftService giftService;

    @Autowired
    public GiftController(GiftService giftService) {
        this.giftService = giftService;
    }

    @GetMapping
    public List<Gift> getAllGifts() {
        return giftService.getAllGifts();
    }

    @GetMapping("/{id}")
    ResponseEntity<Gift> getGiftById(@PathVariable Long id) {
        Gift gift = giftService.getGiftById(id);
        if (gift == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gift);
    }
}
