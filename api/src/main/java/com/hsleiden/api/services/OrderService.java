package com.hsleiden.api.services;

import com.hsleiden.api.models.Order;
import com.hsleiden.api.models.OrderLine;
import com.hsleiden.api.models.Product;
import com.hsleiden.api.repository.OrderRepository;
import com.hsleiden.api.repository.ProductRepository;
import com.hsleiden.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Deprecated
    public boolean jwtAndOrderHaveSameID(UUID jwtID, Order order){
        return (jwtID == order.getUser().getId());
    }

    public boolean orderExists(Order order){
        return orderRepository.existsById(order.getId());
    }

    public boolean orderLinesValid(List<OrderLine> orderLines){
        for (OrderLine orderLine : orderLines) {
            Order olOrder = orderRepository.getById(orderLine.getOrderId());
            Product olProduct = productRepository.getById(orderLine.getProductId());

            if (olOrder.getId() == null){
                return false;
            }
            if (orderLine.getAmount() < 1){
                return false;
            }
            if (!productService.productExists(olProduct)){
                return false;
            }
        }
        return true;
    }
}
