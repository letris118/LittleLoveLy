package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Gift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiftRepository extends JpaRepository<Gift, Long> {

    List<Gift> findByActive(boolean active);
}
