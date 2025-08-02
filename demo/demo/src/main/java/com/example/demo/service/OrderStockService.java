package com.example.demo.service;


import com.example.demo.model.OrderStock;

import java.util.List;

public interface OrderStockService {
    OrderStock createOrder(OrderStock orderStock);
    OrderStock getOrderById(Long id);
    List<OrderStock> getAllOrders();
    OrderStock updateOrder(Long id, OrderStock orderStock);
    void deleteOrder(Long id);
    // In OrderStockService.java

    public Long countPendingOrders();

}

