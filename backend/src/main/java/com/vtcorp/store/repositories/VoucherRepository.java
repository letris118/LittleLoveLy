package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    List<Voucher> findByActive(boolean active);

    @Transactional
    @Modifying
    @Query("UPDATE Voucher v SET v.active = ?1 WHERE v.articleId = ?2")
    void setActivateVoucher(boolean active, long id);

}
