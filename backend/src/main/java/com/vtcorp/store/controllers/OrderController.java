package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.OrderRequestDTO;
import com.vtcorp.store.services.GHNService;
import com.vtcorp.store.services.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final GHNService ghnService;

    @Autowired
    public OrderController(OrderService orderService, GHNService ghnService) {
        this.orderService = orderService;
        this.ghnService = ghnService;
    }

    @Operation(summary = "Get all orders")
    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        try {
            return ResponseEntity.ok(orderService.getAllOrders());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }

    @Operation(summary = "Get order by id")
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(orderService.getOrderById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Calculate total price and point of order")
    @PostMapping("/calculate-total")
    public ResponseEntity<?> caculateTotal(@RequestBody OrderRequestDTO orderRequestDTO) {
        try {
            return ResponseEntity.ok(orderService.calculateTotal(orderRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get list of provinces")
    @GetMapping("provinces")
    public ResponseEntity<?> getProvinces() {
        try {
            return ResponseEntity.ok(ghnService.getProvinces());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
