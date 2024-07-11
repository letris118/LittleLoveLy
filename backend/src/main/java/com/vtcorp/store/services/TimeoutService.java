package com.vtcorp.store.services;

import com.vtcorp.store.entities.Order;
import com.vtcorp.store.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TimeoutService {

    @Value("${vnpay.timeOutInMinutes}")
    private long paymentTimeoutInMinutes;

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    public TimeoutService(OrderService orderService, OrderRepository orderRepository) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
    }

    // Scheduled task to run every minute
    @Scheduled(fixedRate = 60000)
    public void handlePaymentTimeouts(){
        long timeoutDurationMillis = paymentTimeoutInMinutes * 60 * 1000;
        Date timeoutThreshold = new Date(System.currentTimeMillis() - timeoutDurationMillis);
        List<Order> timedOutOrders = orderRepository.findByStatusAndCreatedDateBefore("CART", timeoutThreshold);
        for (Order order : timedOutOrders) {
            orderService.handlePaymentFail(order);
        }
    }
}
