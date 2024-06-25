package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.CartResponseDTO;
import com.vtcorp.store.dtos.OrderEvaluationDTO;
import com.vtcorp.store.dtos.OrderRequestDTO;
import com.vtcorp.store.dtos.OrderResponseDTO;
import com.vtcorp.store.entities.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderResponseDTO toOrderResponseDTO(Order order);

    List<OrderResponseDTO> toOrderResponseDTOs(List<Order> orders);

    CartResponseDTO toCartResponseDTO(Order order);

    @Mapping(target = "orderDetails", ignore = true)
    void updateEntity(OrderRequestDTO orderRequestDTO, @MappingTarget Order order);

    void updateEntity(OrderEvaluationDTO orderEvaluationDTO, @MappingTarget Order order);
}
