package com.vtcorp.store.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.config.VNPayConfig;
import com.vtcorp.store.dtos.OrderRequestDTO;
import com.vtcorp.store.jsonview.Views;
import com.vtcorp.store.services.GHNService;
import com.vtcorp.store.services.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        try {
            return ResponseEntity.ok(orderService.evaluateOrder(orderRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get list of provinces/cities")
    @GetMapping("cities")
    public ResponseEntity<?> getCities() {
        try {
            return ResponseEntity.ok(ghnService.getCities());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get list of districts by city id")
    @GetMapping("districts/{cityId}")
    public ResponseEntity<?> getDistricts(@PathVariable long cityId) {
        try {
            return ResponseEntity.ok(ghnService.getDistricts(cityId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get list of wards by district id")
    @GetMapping("wards/{districtId}")
    public ResponseEntity<?> getWards(@PathVariable long districtId) {
        try {
            return ResponseEntity.ok(ghnService.getWards(districtId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Create new order", description = "Payment method: COD, VNPay")
    @PostMapping
    @JsonView(Views.Order.class)
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO orderRequestDTO, Authentication authentication, HttpServletRequest request) {
        try {
            String username = (authentication == null) ? null : authentication.getName();
            String ipAddress = VNPayConfig.getIpAddress(request);
            return ResponseEntity.ok(orderService.createOrder(orderRequestDTO, username, ipAddress));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
