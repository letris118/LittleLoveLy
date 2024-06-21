package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.CartResponseDTO;
import com.vtcorp.store.dtos.OrderResponseDTO;
import com.vtcorp.store.entities.Order;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderResponseDTO toOrderResponseDTO(Order order);

    List<OrderResponseDTO> toOrderResponseDTOs(List<Order> orders);

    CartResponseDTO toCartResponseDTO(Order order);
}
