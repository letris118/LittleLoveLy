package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Gift;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface GiftRepository extends JpaRepository<Gift, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Gift g SET g.active = ?1 WHERE g.giftId = ?2")
    void setActivateGift(boolean active, long id);

    List<Gift> findByActive(boolean active);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT g FROM Gift g WHERE g.giftId = :id")
    Optional<Gift> findByIdWithLock(@Param("id") Long id);
}
