package com.vtcorp.store.services;

import com.vtcorp.store.dtos.VoucherDTO;
import com.vtcorp.store.entities.*;
import com.vtcorp.store.mappers.ProductMapper;
import com.vtcorp.store.mappers.VoucherMapper;
import com.vtcorp.store.repositories.VoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherService {

    private final VoucherRepository voucherRepository;
    private final VoucherMapper voucherMapper;
    private final ProductMapper productMapper;

    @Autowired
    public VoucherService(VoucherRepository voucherRepository, VoucherMapper voucherMapper, ProductMapper productMapper) {
        this.voucherRepository = voucherRepository;
        this.voucherMapper = voucherMapper;
        this.productMapper = productMapper;
    }

    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    public List<Voucher> getActiveVouchers() {
        return voucherRepository.findByActive(true);
    }

    public Voucher getVoucherById(Long id) {
        return voucherRepository.findById(id).orElse(null);
    }

    @Transactional
    public Voucher createVoucher(VoucherDTO voucherDTO) {
        Voucher voucher = voucherMapper.toEntity(voucherDTO);
        try {
            return voucherRepository.save(voucher);
        } catch (Exception e) {
            throw new RuntimeException("Fail to create voucher", e);
        }
    }

    @Transactional
    public Voucher updateVoucher(VoucherDTO voucherDTO) {
        Voucher voucher = voucherRepository.findById(voucherDTO.getVoucherId())
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        voucherMapper.updateEntity(voucherDTO, voucher);
        return voucher;
    }

}
