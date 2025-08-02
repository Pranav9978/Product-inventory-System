package com.example.demo.repository;

import com.example.demo.model.ProductStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.ProductStock;
import java.util.List;

public interface ProductStockRepository extends JpaRepository<ProductStock, Long> {
    List<ProductStock> findByAvailableStock(int availableStock);


    // Total quantity of all stock
    @Query("SELECT SUM(s.quantity) FROM ProductStock s")
    Long getTotalQuantity();

    // Total available stock
    @Query("SELECT SUM(s.availableStock) FROM ProductStock s")
    Long getTotalAvailableStock();

    // Count of low stock (where availableStock < minStockLevel)
    @Query("SELECT COUNT(s) FROM ProductStock s WHERE s.availableStock < s.minStockLevel")
    long countLowStock();



}


