package com.hsleiden.api.repository;

import com.hsleiden.api.models.Order;
import com.hsleiden.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> getOrdersByUser(User user);
}
