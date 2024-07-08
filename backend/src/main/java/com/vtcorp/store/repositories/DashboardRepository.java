package com.vtcorp.store.repositories;

import com.vtcorp.store.entities.Dashboard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardRepository extends JpaRepository<Dashboard, Integer> {
    Dashboard findByDashboardId(int id);
}
