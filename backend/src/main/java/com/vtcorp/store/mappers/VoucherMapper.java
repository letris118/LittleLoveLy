package com.vtcorp.store.mappers;

import com.vtcorp.store.dtos.VoucherDTO;
import com.vtcorp.store.entities.Voucher;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface VoucherMapper {

    Voucher toEntity(VoucherDTO voucherDTO);

    @Mapping(target = "voucherId", ignore = true)
    void updateEntity(VoucherDTO voucherDTO, @MappingTarget Voucher voucher);

}
