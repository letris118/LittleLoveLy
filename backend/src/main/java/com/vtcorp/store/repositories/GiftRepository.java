package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Gift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GiftRepository extends JpaRepository<Gift, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Gift g SET g.active = ?1 WHERE g.giftId = ?2")
    void setActivateGift(boolean active, long id);

    List<Gift> findByActive(boolean active);
}
