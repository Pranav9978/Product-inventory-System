package com.example.demo.service;

import com.example.demo.model.ProductStock;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProductStockService {
    ProductStock createStock(ProductStock stock);
    ProductStock getStockById(Long id);
    List<ProductStock> getAllStock();
    ProductStock updateStock(Long id, ProductStock stock);
    void deleteStock(Long id);
}

