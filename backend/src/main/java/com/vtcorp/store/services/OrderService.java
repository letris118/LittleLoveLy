package com.vtcorp.store.services;

import com.vtcorp.store.dtos.OrderResponseDTO;
import com.vtcorp.store.mappers.OrderMapper;
import com.vtcorp.store.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    public List<OrderResponseDTO> getAllOrders() {
        return orderMapper.toOrderResponseDTOs(orderRepository.findAll());
    }

    public OrderResponseDTO getOrderById(String id) {
        return orderMapper.toOrderResponseDTO(orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found")));
    }
}
