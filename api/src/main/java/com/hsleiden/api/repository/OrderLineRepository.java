package com.hsleiden.api.repository;

import com.hsleiden.api.models.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderLineRepository  extends JpaRepository<OrderLine, UUID> {
}
