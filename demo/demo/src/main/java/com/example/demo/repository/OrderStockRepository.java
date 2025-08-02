package com.example.demo.repository;

import com.example.demo.model.OrderStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
// In OrderStockRepository.java




public interface OrderStockRepository extends JpaRepository<OrderStock, Long> {
    List<OrderStock> findByStatus(String status);
    long countByStatus(String status);
}



