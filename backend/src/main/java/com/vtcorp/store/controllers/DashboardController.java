package com.vtcorp.store.controllers;

import com.vtcorp.store.services.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    ResponseEntity<?> getDashboard() {
        try {
            return ResponseEntity.ok(dashboardService.getDashboard());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/site-visits")
    ResponseEntity<?> getSiteVisits() {
        try {
            return ResponseEntity.ok(dashboardService.increaseSiteVisit());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(dashboardService.increaseSiteVisit());
        }
    }

}
