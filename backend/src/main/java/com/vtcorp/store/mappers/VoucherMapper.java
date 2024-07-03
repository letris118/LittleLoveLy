package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.VoucherRequestDTO;
import com.vtcorp.store.dtos.VoucherResponseDTO;
import com.vtcorp.store.entities.Voucher;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface VoucherMapper {

    Voucher toEntity(VoucherRequestDTO voucherRequestDTO);

    @Mapping(target = "voucherId", ignore = true)
    void updateEntity(VoucherRequestDTO voucherResponseDTO, @MappingTarget Voucher voucher);

    VoucherResponseDTO toResponseDTO(Voucher voucher);
}
