package com.example.demo.controller;

import com.example.demo.model.ProductStock;
import com.example.demo.service.ProductStockService;
import com.example.demo.repository.ProductStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/stocks")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductStockController {

    @Autowired
    private ProductStockService stockService;

    @Autowired
    private ProductStockRepository stockRepository;

    @PostMapping
    public ProductStock create(@RequestBody ProductStock stock) {
        return stockService.createStock(stock);
    }

    @GetMapping("/{id}")
    public ProductStock get(@PathVariable Long id) {
        return stockService.getStockById(id);
    }

    @GetMapping
    public List<ProductStock> getAll() {
        return stockService.getAllStock();
    }

    @PutMapping("/{id}")
    public ProductStock update(@PathVariable Long id, @RequestBody ProductStock stock) {
        return stockService.updateStock(id, stock);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        stockService.deleteStock(id);
    }

    // ✅ Returns total stock count
    @GetMapping("/count")
    public long getStockCount() {
        return stockService.getAllStock().size();
    }

    // ✅ Returns only out-of-stock items (availableStock = 0)
    @GetMapping("/outofstock")
    public List<ProductStock> getOutOfStock() {
        return stockRepository.findByAvailableStock(0);
    }
}
