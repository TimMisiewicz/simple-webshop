package com.hsleiden.api.controllers;

import com.hsleiden.api.models.Order;
import com.hsleiden.api.models.OrderLine;
import com.hsleiden.api.pojo.OrderLineParameters;
import com.hsleiden.api.models.User;
import com.hsleiden.api.repository.OrderLineRepository;
import com.hsleiden.api.repository.OrderRepository;
import com.hsleiden.api.repository.ProductRepository;
import com.hsleiden.api.repository.UserRepository;
import com.hsleiden.api.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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
    private OrderLineRepository orderLineRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderService orderService;

    @PostMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @Deprecated
    public ResponseEntity<?> addOrderWithID(@PathVariable String id){
//        UUID uuid = UUID.fromString(id);
//        Order order = new Order();
//        UserDetails userDetails =
//                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String username = userDetails.getUsername();
//        UUID jwtID = userRepository.findByUsername(username).get().getId();
//
//        order.setUser(userRepository.findById(jwtID).get());
//        order.setId(uuid);

        return new ResponseEntity<>(HttpStatus.GONE);
    }

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

        return ResponseEntity.ok(order);
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


    @PostMapping("/{id}/lines")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<?> addOrderLines(@PathVariable String id,
                                           @RequestBody List<OrderLineParameters> orderLineParameters){
        UUID uuid = UUID.fromString(id);
        List<OrderLine> orderlines = new ArrayList<>();

        // Jackson doesnt parse UUID's from requestbodies correctly, so we use a string based pojo instead
        for (OrderLineParameters parameters : orderLineParameters) {
            OrderLine orderLine = new OrderLine();

            orderLine.setProductId(UUID.fromString(parameters.getProduct()) );
            orderLine.setOrderId(UUID.fromString(parameters.getOrder()));
            orderLine.setAmount(parameters.getAmount());

            orderlines.add(orderLine);
        }

        Order order = orderRepository.getById(uuid);

        if (!orderService.orderExists(order)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (!orderService.orderLinesValid(orderlines)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        orderLineRepository.saveAll(orderlines);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}/lines")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<?> getOrderLines(@PathVariable String id){
        UUID uuid = UUID.fromString(id);

        return ResponseEntity.ok(orderLineRepository.getOrderLinesByOrderId(uuid));
    }
}
