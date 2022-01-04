package com.hsleiden.api.services;

import com.hsleiden.api.models.Product;
import com.hsleiden.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public boolean isValidProduct(Product product){
        if (product.getPriceInCents() < 1){
            return false;
        }
        if (product.getName() == null || product.getName() == ""){
            return false;
        }
        return true;
    }

    public boolean productExists(Product product){
        return productRepository.existsById(product.getId());
    }
}
