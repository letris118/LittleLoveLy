package com.vtcorp.store.services;

import com.vtcorp.store.entities.Gift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vtcorp.store.repositories.GiftRepository;

import java.util.List;

@Service
public class GiftService {

    private final GiftRepository giftRepository;

    @Autowired
    public GiftService(GiftRepository giftRepository) {
        this.giftRepository = giftRepository;
    }

    public List<Gift> getAllGifts() {
        return giftRepository.findAll();
    }

    public Gift getGiftById(Long id) {
        return giftRepository.findById(id).orElse(null);
    }

}
