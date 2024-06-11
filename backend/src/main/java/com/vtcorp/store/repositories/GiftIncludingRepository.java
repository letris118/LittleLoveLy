package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.GiftIncluding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiftIncludingRepository extends JpaRepository<GiftIncluding, GiftIncluding.GiftIncludingId> {
}
