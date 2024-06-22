package com.vtcorp.store.services;

import com.vtcorp.store.dtos.*;
import com.vtcorp.store.entities.*;
import com.vtcorp.store.jsonview.Views;
import com.vtcorp.store.mappers.OrderMapper;
import com.vtcorp.store.repositories.GiftRepository;
import com.vtcorp.store.repositories.OrderRepository;
import com.vtcorp.store.repositories.ProductRepository;
import com.vtcorp.store.repositories.UserRepository;
import com.vtcorp.store.utils.CodeGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final GiftRepository giftRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper, UserRepository userRepository, ProductRepository productRepository, GiftRepository giftRepository) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.giftRepository = giftRepository;
    }

    public List<OrderResponseDTO> getAllOrders() {
        return orderMapper.toOrderResponseDTOs(orderRepository.findAll());
    }

    public OrderResponseDTO getOrderById(String id) {
        return orderMapper.toOrderResponseDTO(orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found")));
    }

    public CartResponseDTO getCart(String username) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Order cart = orderRepository.findByUserAndStatus(user, "CART");
        if (cart == null) {
            cart = Order.builder()
                    .orderId(CodeGenerator.generateOrderID())
                    .user(user)
                    .status("CART")
                    .build();
            cart = orderRepository.save(cart);
        }
        return orderMapper.toCartResponseDTO(cart);
    }

    @Transactional
    public CartResponseDTO addItemToCart(String username, CartItemDTO cartItemDTO) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order cart = orderRepository.findByUserAndStatus(user, "CART");
        if (cart == null) {
            cart = Order.builder()
                    .orderId(CodeGenerator.generateOrderID())
                    .user(user)
                    .status("CART")
                    .orderDetails(new ArrayList<>())
                    .giftIncludings(new ArrayList<>())
                    .build();
        }

        if (cartItemDTO.getItemType().equals("product")) {
            Product product = productRepository.findById(cartItemDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            if (product.getStock() == null || product.getStock() < cartItemDTO.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for product");
            }

            for (OrderDetail item : cart.getOrderDetails()) {
                if (item.getProduct().getProductId() == cartItemDTO.getId()) {
                    item.setQuantity(item.getQuantity() + cartItemDTO.getQuantity());
                    item.setPrice(product.getSellingPrice());
                    return orderMapper.toCartResponseDTO(cart);
                }
            }
            cart.getOrderDetails().add(OrderDetail.builder()
                    .orderDetailId(new OrderDetail.OrderDetailId(cart.getOrderId(), product.getProductId()))
                    .order(cart)
                    .product(product)
                    .quantity(cartItemDTO.getQuantity())
                    .price(product.getSellingPrice())
                    .build());

        } else if (cartItemDTO.getItemType().equals("gift")) {
            Gift gift = giftRepository.findById(cartItemDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Gift not found"));
            if (gift.getStock() == null || gift.getStock() < cartItemDTO.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for gift");
            }
            if (gift.getPoint() == null || gift.getPoint() > user.getPoint()) {
                throw new IllegalArgumentException("Insufficient point for gift");
            }

            for (GiftIncluding item : cart.getGiftIncludings()) {
                if (item.getGift().getGiftId() == cartItemDTO.getId()) {
                    item.setQuantity(item.getQuantity() + cartItemDTO.getQuantity());
                    item.setPoint(item.getGift().getPoint());
                    return orderMapper.toCartResponseDTO(cart);
                }
            }
            cart.getGiftIncludings().add(GiftIncluding.builder()
                    .giftIncludingId(new GiftIncluding.GiftIncludingId(cart.getOrderId(), gift.getGiftId()))
                    .order(cart)
                    .gift(gift)
                    .quantity(cartItemDTO.getQuantity())
                    .point(gift.getPoint())
                    .build());
        } else {
            throw new IllegalArgumentException("Item type not found");
        }

        return orderMapper.toCartResponseDTO(orderRepository.save(cart));
    }

    @Transactional
    public CartResponseDTO removeItemFromCart(String username, CartItemDTO cartItemDTO) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order cart = orderRepository.findByUserAndStatus(user, "CART");
        if (cart == null) {
            throw new RuntimeException("Cart not found");
        }
        if (cart.getOrderDetails().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        if (cartItemDTO.getItemType().equals("product")) {
            productRepository.findById(cartItemDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            for (OrderDetail item : cart.getOrderDetails()) {
                if (item.getProduct().getProductId() == cartItemDTO.getId()) {
                    item.setQuantity(item.getQuantity() - cartItemDTO.getQuantity());
                    if (item.getQuantity() <= 0) {
                        cart.getOrderDetails().remove(item);
                    }
                    break;
                }
            }
        } else if (cartItemDTO.getItemType().equals("gift")) {
            giftRepository.findById(cartItemDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Gift not found"));

            for (GiftIncluding item : cart.getGiftIncludings()) {
                if (item.getGift().getGiftId() == cartItemDTO.getId()) {
                    item.setQuantity(item.getQuantity() - cartItemDTO.getQuantity());
                    if (item.getQuantity() <= 0) {
                        cart.getGiftIncludings().remove(item);
                    }
                    break;
                }
            }
        } else {
            throw new IllegalArgumentException("Item type not found");
        }

        return orderMapper.toCartResponseDTO(orderRepository.save(cart));
    }

    // chua ap dung voucher
    public OrderTotalDTO calculateTotal(OrderRequestDTO orderRequestDTO) {
        double totalPrice = 0.0;
        int totalPoints = 0;
        for (CartItemDTO item : orderRequestDTO.getOrderDetails()) {
            if (item.getItemType().equals("product")) {
                Product product = productRepository.findById(item.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));
                totalPrice += product.getSellingPrice() * item.getQuantity();
            } else if (item.getItemType().equals("gift")) {
                Gift gift = giftRepository.findById(item.getId())
                        .orElseThrow(() -> new RuntimeException("Gift not found"));
                totalPoints += gift.getPoint() * item.getQuantity();
            } else {
                throw new IllegalArgumentException("Item type not found");
            }
        }
        return new OrderTotalDTO(totalPrice, totalPoints);
    }
}
