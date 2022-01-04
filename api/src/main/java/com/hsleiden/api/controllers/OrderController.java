package com.hsleiden.api.controllers;

import com.hsleiden.api.models.Order;
import com.hsleiden.api.models.Product;
import com.hsleiden.api.models.User;
import com.hsleiden.api.repository.OrderRepository;
import com.hsleiden.api.repository.UserRepository;
import com.hsleiden.api.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/sws/api/order")
public class OrderController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<?> addOrder(){

        Order order = new Order();

        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        UUID jwtID = userRepository.findByUsername(username).get().getId();

        order.setUser(userRepository.findById(jwtID).get());

        orderRepository.save(order);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<?> getAllOrdersByUser(){

        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        UUID jwtID = userRepository.findByUsername(username).get().getId();
        User user = userRepository.findById(jwtID).get();

        return ResponseEntity.ok(orderRepository.getOrdersByUser(user));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    //    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getAllOrders(){
        return ResponseEntity.ok(orderRepository.findAll());
    }
}
