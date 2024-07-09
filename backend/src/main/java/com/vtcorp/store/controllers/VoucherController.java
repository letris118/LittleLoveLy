package com.vtcorp.store.controllers;

import com.vtcorp.store.dtos.VoucherRequestDTO;
import com.vtcorp.store.services.VoucherService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/vouchers")
public class VoucherController {

    private final VoucherService voucherService;

    @Autowired
    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @Operation(summary = "Get all vouchers")
    @GetMapping("/all")
    public ResponseEntity<?> getAllVouchers() {
        try {
            return ResponseEntity.ok(voucherService.getAllVouchers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get active vouchers")
    @GetMapping
    public ResponseEntity<?> getActiveVouchers() {
        try {
            return ResponseEntity.ok(voucherService.getActiveVouchers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get valid vouchers by username")
    @GetMapping("/user/{username}")
    public ResponseEntity<?> getValidVouchersByUsername(@PathVariable String username) {
        try {
            return ResponseEntity.ok(voucherService.getValidVouchersByUsername(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get voucher by ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> getVoucherById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(voucherService.getVoucherById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Create voucher")
    @PostMapping
    public ResponseEntity<?> createVoucher(@ModelAttribute VoucherRequestDTO voucherRequestDTO) {
        try {
            return ResponseEntity.ok(voucherService.createVoucher(voucherRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update voucher by ID")
    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updateVoucher(@PathVariable Long id, @ModelAttribute VoucherRequestDTO voucherRequestDTO) {
        if (id != voucherRequestDTO.getVoucherId()) {
            return ResponseEntity.badRequest().body("Voucher ID in the path variable does not match the one in the request body");
        }
        try {
            return ResponseEntity.ok(voucherService.updateVoucher(voucherRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Deactivate voucher by ID")
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<?> deactivateVoucher(@PathVariable long id) {
        try {
            return ResponseEntity.ok(voucherService.deactivateVoucher(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Activate voucher by ID")
    @PutMapping("/activate/{id}")
    public ResponseEntity<?> activateVoucher(@PathVariable long id) {
        try {
            return ResponseEntity.ok(voucherService.activateVoucher(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
