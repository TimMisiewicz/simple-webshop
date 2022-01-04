package com.hsleiden.api.pojo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.UUIDDeserializer;

public class OrderLineParameters {
    private int amount;

    private String order;

    private String product;

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    @JsonCreator(mode = JsonCreator.Mode.DEFAULT)
    public OrderLineParameters(int amount, String order, String product) {
        this.amount = amount;
        this.order = order;
        this.product = product;
    }
}
