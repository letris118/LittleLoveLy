package com.vtcorp.store.services;

import com.vtcorp.store.constants.Role;
import com.vtcorp.store.dtos.VoucherRequestDTO;
import com.vtcorp.store.dtos.VoucherResponseDTO;
import com.vtcorp.store.entities.*;
import com.vtcorp.store.mappers.ProductMapper;
import com.vtcorp.store.mappers.VoucherMapper;
import com.vtcorp.store.repositories.ProductRepository;
import com.vtcorp.store.repositories.UserRepository;
import com.vtcorp.store.repositories.VoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class VoucherService {

    private final VoucherRepository voucherRepository;
    private final VoucherMapper voucherMapper;
    private final UserRepository userRepository;

    @Autowired
    public VoucherService(VoucherRepository voucherRepository, VoucherMapper voucherMapper, ProductMapper productMapper, ProductRepository productRepository, UserRepository userRepository) {
        this.voucherRepository = voucherRepository;
        this.voucherMapper = voucherMapper;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<VoucherResponseDTO> getAllVouchers() {
        List<Voucher> vouchers = voucherRepository.findAll();
        for (Voucher voucher : vouchers) {
            if ((voucher.getEndDate().before(new Date()) && voucher.isActive()) || voucher.getAppliedCount() >= voucher.getLimit()) {
                System.out.println(voucher.getEndDate());
                voucher.setActive(false);
                voucherRepository.save(voucher);
            }
        }
        return mapVouchersToVoucherResponseDTOs(vouchers);
    }

    public List<VoucherResponseDTO> getActiveVouchers() {
        return mapVouchersToVoucherResponseDTOs(voucherRepository.findByActive(true));
    }

    public VoucherResponseDTO getVoucherById(Long id) {
        return mapVoucherToVoucherResponseDTO(voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher not found")));
    }


    public List<VoucherResponseDTO> getValidVouchersByUsername(String username) {
        return mapVouchersToVoucherResponseDTOs(voucherRepository.findValidVouchersByUsername(username, new Date()));
    }

    @Transactional
    public VoucherResponseDTO createVoucher(VoucherRequestDTO voucherRequestDTO) {
        List<User> users = userRepository.findByRole(Role.ROLE_CUSTOMER);
        Voucher voucher = voucherMapper.toEntity(voucherRequestDTO);
        voucher.setActive(true);
        voucher.setAppliedCount(0);
        voucher.setEndDate(toEndOfDate(voucher.getEndDate()));
        for (User user : users) {
            user.getVouchers().add(voucher);
        }
        voucher.setUsers(users);
        return voucherMapper.toResponseDTO(voucherRepository.save(voucher));
    }

    @Transactional
    public VoucherResponseDTO updateVoucher(VoucherRequestDTO voucherRequestDTO) {
        Voucher voucher = voucherRepository.findById(voucherRequestDTO.getVoucherId())
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        Integer appliedCount = voucher.getAppliedCount();
        voucherMapper.updateEntity(voucherRequestDTO, voucher);
        voucher.setAppliedCount(appliedCount);
        voucher.setEndDate(toEndOfDate(voucher.getEndDate()));
        return mapVoucherToVoucherResponseDTO(voucher);
    }

    public String deactivateVoucher(long id) {
        voucherRepository.setActivateVoucher(false, id);
        return "Article deactivated";
    }

    public String activateVoucher(long id) {
        voucherRepository.setActivateVoucher(true, id);
        return "Article activated";
    }

    private VoucherResponseDTO mapVoucherToVoucherResponseDTO(Voucher voucher) {
        return voucherMapper.toResponseDTO(voucher);
    }

    private List<VoucherResponseDTO> mapVouchersToVoucherResponseDTOs(List<Voucher> vouchers) {
        List<VoucherResponseDTO> voucherResponseDTOS = new ArrayList<>();
        for (Voucher voucher : vouchers) {
            voucherResponseDTOS.add(mapVoucherToVoucherResponseDTO(voucher));
        }
        return voucherResponseDTOS;
    }

    private Date toEndOfDate(Date endDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(endDate);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }

}
