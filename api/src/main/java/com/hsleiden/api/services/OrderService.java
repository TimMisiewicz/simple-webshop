package com.hsleiden.api.services;

import com.hsleiden.api.models.Order;
import com.hsleiden.api.repository.OrderRepository;
import com.hsleiden.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Deprecated
    public boolean jwtAndOrderHaveSameID(UUID jwtID, Order order){
        return (jwtID == order.getUser().getId());
    }
}
