package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetail.OrderDetailId> {

    @Query("SELECT COUNT(od) > 0 FROM OrderDetail od " +
            "WHERE od.order.user.username = :username " +
            "AND od.product.productId = :productId " +
            "AND od.order.status IN :statuses")
    boolean existsByUserAndProductAndStatus(@Param("username") String username,
                                            @Param("productId") Long productId,
                                            @Param("statuses") List<String> statuses);
}
