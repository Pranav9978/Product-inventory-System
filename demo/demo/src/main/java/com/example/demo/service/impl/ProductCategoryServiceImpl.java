package com.example.demo.service.impl;


import com.example.demo.model.ProductCategory;
import com.example.demo.repository.ProductCategoryRepository;
import com.example.demo.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    private ProductCategoryRepository categoryRepository;

    @Override
    public ProductCategory createCategory(ProductCategory category) {
        return categoryRepository.save(category);
    }

    @Override
    public ProductCategory getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProductCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public ProductCategory updateCategory(Long id, ProductCategory updatedCategory) {
        Optional<ProductCategory> optional = categoryRepository.findById(id);
        if (optional.isPresent()) {
            ProductCategory existing = optional.get();
            existing.setCategoryName(updatedCategory.getCategoryName());
            return categoryRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}

