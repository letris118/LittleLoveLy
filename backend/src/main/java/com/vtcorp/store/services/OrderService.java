package com.vtcorp.store.services;

import com.vtcorp.store.dtos.*;
import com.vtcorp.store.entities.*;
import com.vtcorp.store.enums.CODPaymentStatus;
import com.vtcorp.store.enums.OnlinePaymentStatus;
import com.vtcorp.store.enums.PaymentMethod;
import com.vtcorp.store.mappers.OrderMapper;
import com.vtcorp.store.repositories.*;
import com.vtcorp.store.utils.CodeGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final GiftRepository giftRepository;
    private final GHNService ghnService;
    private final PaymentService paymentService;
    private final VoucherRepository voucherRepository;

    @Value("${ghn.api.weight}")
    private int weight;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper, UserRepository userRepository, ProductRepository productRepository, GiftRepository giftRepository, GHNService ghnService, PaymentService paymentService, VoucherRepository voucherRepository) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.giftRepository = giftRepository;
        this.ghnService = ghnService;
        this.paymentService = paymentService;
        this.voucherRepository = voucherRepository;
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
            updateOrderDetail(cart, cartItemDTO, false);
        } else if (cartItemDTO.getItemType().equals("gift")) {
            updateGiftIncluding(cart, cartItemDTO, user, false);
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

    @Transactional
    public CartResponseDTO updateItemInCart(String username, CartItemDTO cartItemDTO) {
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
            updateOrderDetail(cart, cartItemDTO, true);
        } else if (cartItemDTO.getItemType().equals("gift")) {
            updateGiftIncluding(cart, cartItemDTO, user, true);
        } else {
            throw new IllegalArgumentException("Item type not found");
        }
        return orderMapper.toCartResponseDTO(orderRepository.save(cart));
    }

    // chua ap dung voucher
    public OrderEvaluationDTO evaluateOrder(OrderRequestDTO orderRequestDTO) {
        double basePrice = 0.0;
        int totalPoints = 0;
        Double shippingFee = null;
        int totalProductQuantity = 0;
        for (CartItemDTO item : orderRequestDTO.getCartItems()) {
            if (item.getItemType().equals("product")) {
                Product product = productRepository.findById(item.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));
                basePrice += product.getSellingPrice() * item.getQuantity();
                totalProductQuantity += item.getQuantity();
            } else if (item.getItemType().equals("gift")) {
                Gift gift = giftRepository.findById(item.getId())
                        .orElseThrow(() -> new RuntimeException("Gift not found"));
                totalPoints += gift.getPoint() * item.getQuantity();
            } else {
                throw new IllegalArgumentException("Invalid item type");
            }
        }
        Long districtId = orderRequestDTO.getCusDistrictId();
        Long wardCode = orderRequestDTO.getCusWardCode();
        if (districtId != null && wardCode != null) {
            shippingFee = ghnService.calculateFee(districtId, wardCode, weight);
        }
        double totalPrice = basePrice + (shippingFee != null ? shippingFee : 0);
        double discount = 0.0;
        double postDiscountPrice = totalPrice - discount;
        int bonusPoint = (int) (basePrice / 1000);
        return new OrderEvaluationDTO(basePrice, shippingFee, bonusPoint, totalProductQuantity, totalPrice, postDiscountPrice, totalPoints);
    }

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO, String username, String ipAddress) {
        List<CartItemDTO> cartItems = orderRequestDTO.getCartItems();
        OrderEvaluationDTO evaluateOrder = evaluateOrder(orderRequestDTO);
        if (cartItems == null || cartItems.isEmpty() || evaluateOrder.getTotalQuantity() == 0) {
            throw new IllegalArgumentException("Cart is empty");
        }
        User user = (username == null) ? null : userRepository.findById(username).orElse(null);
        Order order = null;
        if (user != null) {
            order = orderRepository.findByUserAndStatus(user, "CART");
        }
        if (order == null) {
            order = new Order();
            order.setOrderId(CodeGenerator.generateOrderID());
            order.setOrderDetails(new ArrayList<>());
            order.setGiftIncludings(new ArrayList<>());
        }
        Voucher voucher = voucherRepository.findById(orderRequestDTO.getVoucherId()).orElse(null);
        List<OrderDetail> orderDetails = new ArrayList<>();
        List<GiftIncluding> giftIncludings = new ArrayList<>();
        for (CartItemDTO item : cartItems) {
            if (item.getItemType().equals("product")) {
                Product product = productRepository.findById(item.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));
                if (product.getStock() == null || product.getStock() < item.getQuantity()) {
                    throw new IllegalArgumentException("Insufficient stock for product");
                }
                orderDetails.add(OrderDetail.builder()
                        .orderDetailId(new OrderDetail.OrderDetailId(order.getOrderId(), product.getProductId()))
                        .order(order)
                        .product(product)
                        .quantity(item.getQuantity())
                        .price(product.getSellingPrice())
                        .build());
            } else if (item.getItemType().equals("gift") && user != null) {
                Gift gift = giftRepository.findById(item.getId())
                        .orElseThrow(() -> new RuntimeException("Gift not found"));
                if (gift.getStock() == null || gift.getStock() < item.getQuantity()) {
                    throw new IllegalArgumentException("Insufficient stock for gift");
                }
                if (gift.getPoint() == null || gift.getPoint() * item.getQuantity() > user.getPoint()) {
                    throw new IllegalArgumentException("Insufficient point for gift");
                }
                giftIncludings.add(GiftIncluding.builder()
                        .giftIncludingId(new GiftIncluding.GiftIncludingId(order.getOrderId(), gift.getGiftId()))
                        .order(order)
                        .gift(gift)
                        .quantity(item.getQuantity())
                        .point(gift.getPoint())
                        .build());
            } else {
                throw new IllegalArgumentException("Invalid item type");
            }
        }

        orderMapper.updateEntity(orderRequestDTO, order);
        orderMapper.updateEntity(evaluateOrder, order);
        Date now = new Date();
        order.setCreatedDate(now);
        if (voucher != null && voucher.isActive() && voucher.getStartDate().before(now) && voucher.getEndDate().after(now)) {
            order.setVoucher(voucher);
        }
        if (order.getUser() == null && user != null) {
            order.setUser(user);
        }
        order.getOrderDetails().clear();
        order.getOrderDetails().addAll(orderDetails);
        order.getGiftIncludings().clear();
        order.getGiftIncludings().addAll(giftIncludings);

        if (orderRequestDTO.getPaymentMethod().equals(PaymentMethod.VN_PAY.toString())) {
            order.setStatus(OnlinePaymentStatus.ONLINE_PAYMENT_PENDING.toString());
            double finalPrice = evaluateOrder.getPostDiscountPrice();
            PaymentResponseDTO paymentResponseDTO = paymentService.createPayment(finalPrice, ipAddress);
            return mapOrderToResponse(orderRepository.save(order), paymentResponseDTO);
        } else if (orderRequestDTO.getPaymentMethod().equals(PaymentMethod.COD.toString())) {
            order.setStatus(CODPaymentStatus.COD_PENDING_CONFIRMATION.toString());
            return mapOrderToResponse(orderRepository.save(order), null);
        } else {
            throw new IllegalArgumentException("Invalid payment method");
        }
    }

    private OrderResponseDTO mapOrderToResponse(Order order, PaymentResponseDTO paymentResponseDTO) {
        OrderResponseDTO orderResponseDTO = orderMapper.toOrderResponseDTO(order);
        orderResponseDTO.setPaymentResponse(paymentResponseDTO);
        orderResponseDTO.setCusCity(ghnService.getCityName(order.getCusCityCode()));
        orderResponseDTO.setCusDistrict(ghnService.getDistrictName(order.getCusCityCode(), order.getCusDistrictId()));
        orderResponseDTO.setCusWard(ghnService.getWardName(order.getCusDistrictId(), order.getCusWardCode()));
        return orderResponseDTO;
    }

    private void updateOrderDetail(Order cart, CartItemDTO cartItemDTO, boolean isReplaceQuantity) {
        Product product = productRepository.findById(cartItemDTO.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (product.getStock() == null || product.getStock() < cartItemDTO.getQuantity()) {
            throw new IllegalArgumentException("Insufficient stock for product");
        }

        for (OrderDetail item : cart.getOrderDetails()) {
            if (item.getProduct().getProductId() == cartItemDTO.getId()) {
                if (isReplaceQuantity) {
                    item.setQuantity(cartItemDTO.getQuantity());
                } else {
                    item.setQuantity(item.getQuantity() + cartItemDTO.getQuantity());
                }
                item.setPrice(product.getSellingPrice());
                return;
            }
        }
        cart.getOrderDetails().add(OrderDetail.builder()
                .orderDetailId(new OrderDetail.OrderDetailId(cart.getOrderId(), product.getProductId()))
                .order(cart)
                .product(product)
                .quantity(cartItemDTO.getQuantity())
                .price(product.getSellingPrice())
                .build());
    }

    private void updateGiftIncluding(Order cart, CartItemDTO cartItemDTO, User user, boolean isReplaceQuantity) {
        Gift gift = giftRepository.findById(cartItemDTO.getId())
                .orElseThrow(() -> new RuntimeException("Gift not found"));
        if (gift.getStock() == null || gift.getStock() < cartItemDTO.getQuantity()) {
            throw new IllegalArgumentException("Insufficient stock for gift");
        }
        if (gift.getPoint() == null || user.getPoint() == null || gift.getPoint() * cartItemDTO.getQuantity() > user.getPoint()) {
            throw new IllegalArgumentException("Insufficient point for gift");
        }

        for (GiftIncluding item : cart.getGiftIncludings()) {
            if (item.getGift().getGiftId() == cartItemDTO.getId()) {
                if (isReplaceQuantity) {
                    item.setQuantity(cartItemDTO.getQuantity());
                } else {
                    item.setQuantity(item.getQuantity() + cartItemDTO.getQuantity());
                }
                item.setPoint(item.getGift().getPoint());
                return;
            }
        }
        cart.getGiftIncludings().add(GiftIncluding.builder()
                .giftIncludingId(new GiftIncluding.GiftIncludingId(cart.getOrderId(), gift.getGiftId()))
                .order(cart)
                .gift(gift)
                .quantity(cartItemDTO.getQuantity())
                .point(gift.getPoint())
                .build());
    }
}
