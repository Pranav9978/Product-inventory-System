package com.example.demo.service;

import com.example.demo.model.Product;
import java.util.List;

public interface ProductService {
    Product createProduct(Product product);
    Product getProductById(Long id);
    List<Product> getAllProducts();
    List<Product> getProductsByStatus(String status);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
    Product saveProduct(Product product);  // for single
}
