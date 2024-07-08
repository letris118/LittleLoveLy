package com.vtcorp.store.services;

import com.vtcorp.store.entities.Dashboard;
import com.vtcorp.store.repositories.DashboardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    @Autowired
    public DashboardService(DashboardRepository dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    public Dashboard getDashboard() {
        return dashboardRepository.findByDashboardId(1);
    }

    @Transactional
    public Dashboard increaseSiteVisit() {
        Dashboard dashboard = dashboardRepository.findByDashboardId(1);
        dashboard.setSiteVisits(dashboard.getSiteVisits() + 1);
        return dashboardRepository.save(dashboard);
    }

}
