package com.vtcorp.store.services;

import com.vtcorp.store.dtos.CartItemDTO;
import com.vtcorp.store.dtos.CartResponseDTO;
import com.vtcorp.store.dtos.OrderResponseDTO;
import com.vtcorp.store.entities.Order;
import com.vtcorp.store.entities.OrderDetail;
import com.vtcorp.store.entities.Product;
import com.vtcorp.store.entities.User;
import com.vtcorp.store.mappers.OrderMapper;
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

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
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
        Product product = productRepository.findById(cartItemDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < cartItemDTO.getQuantity()) {
            throw new IllegalArgumentException("Insufficient stock for product");
        }

        Order cart = orderRepository.findByUserAndStatus(user, "CART");
        if (cart == null) {
            cart = Order.builder()
                    .orderId(CodeGenerator.generateOrderID())
                    .user(user)
                    .status("CART")
                    .orderDetails(new ArrayList<>())
                    .build();
        }

        for (OrderDetail item : cart.getOrderDetails()) {
            if (item.getProduct().getProductId() == cartItemDTO.getProductId()) {
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

        return orderMapper.toCartResponseDTO(orderRepository.save(cart));
    }

    @Transactional
    public CartResponseDTO removeItemFromCart(String username, CartItemDTO cartItemDTO) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        productRepository.findById(cartItemDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Order cart = orderRepository.findByUserAndStatus(user, "CART");
        if (cart == null) {
            throw new RuntimeException("Cart not found");
        }
        if (cart.getOrderDetails().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        for (OrderDetail item : cart.getOrderDetails()) {
            if (item.getProduct().getProductId() == cartItemDTO.getProductId()) {
                item.setQuantity(item.getQuantity() - cartItemDTO.getQuantity());
                if (item.getQuantity() <= 0) {
                    cart.getOrderDetails().remove(item);
                }
                break;
            }
        }
        return orderMapper.toCartResponseDTO(orderRepository.save(cart));
    }
}
