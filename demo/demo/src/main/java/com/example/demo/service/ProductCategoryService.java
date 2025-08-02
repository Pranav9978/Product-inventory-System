package com.example.demo.service;

import com.example.demo.model.ProductCategory;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProductCategoryService {
    ProductCategory createCategory(ProductCategory category);
    ProductCategory getCategoryById(Long id);
    List<ProductCategory> getAllCategories();
    ProductCategory updateCategory(Long id, ProductCategory category);
    void deleteCategory(Long id);
}

