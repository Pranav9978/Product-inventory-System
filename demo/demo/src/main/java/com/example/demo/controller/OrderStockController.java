package com.example.demo.controller;

import com.example.demo.model.OrderStock;
import com.example.demo.service.OrderStockService;
import com.example.demo.repository.OrderStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderStockController {

    @Autowired
    private OrderStockService orderStockService;

    @Autowired
    private OrderStockRepository orderStockRepository;

    @PostMapping
    public OrderStock createOrder(@RequestBody OrderStock orderStock) {
        return orderStockService.createOrder(orderStock);
    }

    @GetMapping
    public List<OrderStock> getAllOrders() {
        return orderStockService.getAllOrders();
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderStockService.deleteOrder(id);
    }

    // ✅ Returns only pending orders
    @GetMapping("/pending")
    public List<OrderStock> getPendingOrders() {
        return orderStockRepository.findByStatus("pending");
    }

    // ✅ Returns count of pending orders
    @GetMapping("/pending/count")
    public long getPendingOrderCount() {
        return orderStockRepository.countByStatus("pending");
    }
}
