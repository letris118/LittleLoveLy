package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Voucher;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    List<Voucher> findByActive(boolean active);

    @Transactional
    @Modifying
    @Query("UPDATE Voucher v SET v.active = ?1 WHERE v.voucherId = ?2")
    void setActivateVoucher(boolean active, long id);

    @Query("SELECT v FROM Voucher v JOIN v.users u WHERE u.username = :username AND v.active = true AND v.appliedCount < v.limit AND :now BETWEEN v.startDate AND v.endDate")
    List<Voucher> findValidVouchersByUsername(@Param("username") String username, @Param("now") Date now);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT v FROM Voucher v WHERE v.voucherId = :id")
    Optional<Voucher> findByIdWithLock(@Param("id") Long id);
}
