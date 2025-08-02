package com.example.demo.controller;

import com.example.demo.model.ProductCategory;
import com.example.demo.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173") // restrict to your frontend
public class ProductCategoryController {

    @Autowired
    private ProductCategoryService productCategoryService;

    // Create a new category
    @PostMapping
    public ProductCategory createCategory(@RequestBody ProductCategory category) {
        return productCategoryService.createCategory(category);
    }

    // Get category by ID
    @GetMapping("/{id}")
    public ProductCategory getCategoryById(@PathVariable Long id) {
        return productCategoryService.getCategoryById(id);
    }

    // Get all categories
    @GetMapping
    public List<ProductCategory> getAllCategories() {
        return productCategoryService.getAllCategories();
    }

    // Update category
    @PutMapping("/{id}")
    public ProductCategory updateCategory(@PathVariable Long id, @RequestBody ProductCategory category) {
        return productCategoryService.updateCategory(id, category);
    }

    // Delete category
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        productCategoryService.deleteCategory(id);
    }
}
