package com.example.demo.service.impl;

import com.example.demo.model.OrderStock;
import com.example.demo.repository.OrderStockRepository;
import com.example.demo.service.OrderStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderStockServiceImpl implements OrderStockService {

    @Autowired
    private OrderStockRepository orderStockRepository;

    @Override
    public Long countPendingOrders() {
        return orderStockRepository.countByStatus("Pending");
    }

    @Override
    public OrderStock createOrder(OrderStock orderStock) {
        return orderStockRepository.save(orderStock);
    }

    @Override
    public OrderStock getOrderById(Long id) {
        return orderStockRepository.findById(id).orElse(null);
    }

    @Override
    public List<OrderStock> getAllOrders() {
        return orderStockRepository.findAll();
    }

    @Override
    public OrderStock updateOrder(Long id, OrderStock updatedOrder) {
        Optional<OrderStock> optional = orderStockRepository.findById(id);
        if (optional.isPresent()) {
            OrderStock existing = optional.get();
            existing.setProductId(updatedOrder.getProductId());
            existing.setQuantityOrdered(updatedOrder.getQuantityOrdered());
            existing.setOrderDate(updatedOrder.getOrderDate());
            existing.setStatus(updatedOrder.getStatus());
            return orderStockRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteOrder(Long id) {
        orderStockRepository.deleteById(id);
    }
}
