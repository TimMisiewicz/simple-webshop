package com.hsleiden.api.controllers;

import com.hsleiden.api.models.Product;
import com.hsleiden.api.repository.ProductRepository;
import com.hsleiden.api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/sws/api/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
//     @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<?> getAllProducts(){
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> addNewProduct(@RequestBody Product product){
        if (!productService.isValidProduct(product)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        productRepository.save(product);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/edit")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> editProduct(@RequestBody Product product){
        if (!productService.productExists(product)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!productService.isValidProduct(product)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        productRepository.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
