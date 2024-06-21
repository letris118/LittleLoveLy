package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Order;
import com.vtcorp.store.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    Order findByUserAndStatus(User user, String status);
}
