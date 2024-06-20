package com.vtcorp.store.services;

import com.vtcorp.store.dtos.VoucherRequestDTO;
import com.vtcorp.store.dtos.VoucherResponseDTO;
import com.vtcorp.store.entities.*;
import com.vtcorp.store.mappers.ProductMapper;
import com.vtcorp.store.mappers.VoucherMapper;
import com.vtcorp.store.repositories.ProductRepository;
import com.vtcorp.store.repositories.VoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VoucherService {

    private final VoucherRepository voucherRepository;
    private final VoucherMapper voucherMapper;
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;

    @Autowired
    public VoucherService(VoucherRepository voucherRepository, VoucherMapper voucherMapper, ProductMapper productMapper, ProductRepository productRepository) {
        this.voucherRepository = voucherRepository;
        this.voucherMapper = voucherMapper;
        this.productMapper = productMapper;
        this.productRepository = productRepository;
    }

    public List<VoucherResponseDTO> getAllVouchers() {
        return mapVouchersToVoucherResponseDTOs(voucherRepository.findAll());
    }

    public List<VoucherResponseDTO> getActiveVouchers() {
        return mapVouchersToVoucherResponseDTOs(voucherRepository.findByActive(true));
    }

    public VoucherResponseDTO getVoucherById(Long id) {
        return mapVoucherToVoucherResponseDTO(voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher not found")));
    }

    @Transactional
    public VoucherResponseDTO createVoucher(VoucherRequestDTO voucherRequestDTO) {

        Voucher voucher = voucherMapper.toEntity(voucherRequestDTO);
        try {
            return voucherMapper.toDTO(voucherRepository.save(voucher));
        } catch (Exception e) {
            throw new RuntimeException("Fail to create voucher", e);
        }
    }

    @Transactional
    public VoucherResponseDTO updateVoucher(VoucherRequestDTO voucherRequestDTO) {
        Voucher voucher = voucherRepository.findById(voucherRequestDTO.getVoucherId())
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        Integer appliedCount = voucher.getAppliedCount();
        voucherMapper.updateEntity(voucherRequestDTO, voucher);
        voucher.setAppliedCount(appliedCount);
        return mapVoucherToVoucherResponseDTO(voucher);
    }

    private VoucherResponseDTO mapVoucherToVoucherResponseDTO(Voucher voucher) {
        VoucherResponseDTO voucherResponseDTO = voucherMapper.toDTO(voucher);
        return voucherResponseDTO;
    }

    private List<VoucherResponseDTO> mapVouchersToVoucherResponseDTOs(List<Voucher> vouchers) {
        List<VoucherResponseDTO> voucherResponseDTOS = new ArrayList<>();
        for (Voucher voucher : vouchers) {
            voucherResponseDTOS.add(mapVoucherToVoucherResponseDTO(voucher));
        }
        return voucherResponseDTOS;
    }

}
