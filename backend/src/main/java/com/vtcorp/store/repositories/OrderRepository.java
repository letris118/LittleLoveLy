package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Order;
import com.vtcorp.store.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    Order findByUserAndStatus(User user, String status);

    @Query("SELECT o FROM Order o WHERE o.status <> 'CART'")
    List<Order> findAllExceptCart();

    @Query("SELECT o FROM Order o WHERE o.orderId = :orderId AND o.status <> 'CART'")
    Order findByIdAndStatusNotCart(String orderId);

    @Query("SELECT o FROM Order o WHERE o.user = :user AND o.status <> 'CART'")
    List<Order> findByUserAndStatusNotCart(User user);
}
