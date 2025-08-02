package com.example.demo.service.impl;

import com.example.demo.model.ProductStock;
import com.example.demo.repository.ProductStockRepository;
import com.example.demo.service.ProductStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductStockServiceImpl implements ProductStockService {

    @Autowired
    private ProductStockRepository stockRepository;

    @Override
    public ProductStock createStock(ProductStock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public ProductStock getStockById(Long id) {
        return stockRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProductStock> getAllStock() {
        return stockRepository.findAll();
    }



    @Override
    public ProductStock updateStock(Long id, ProductStock updatedStock) {
        Optional<ProductStock> optional = stockRepository.findById(id);
        if (optional.isPresent()) {
            ProductStock existing = optional.get();
            existing.setProductId(updatedStock.getProductId());
            existing.setQuantity(updatedStock.getQuantity());
            existing.setMinStockLevel(updatedStock.getMinStockLevel());
            existing.setAvailableStock(updatedStock.getAvailableStock()); // ← Add this line
            return stockRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}

