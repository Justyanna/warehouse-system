package edu.uwb.ii.warehouse.components.Order;

import java.util.List;
import java.util.Map;

public class OrderRequest {
    private String customer;
    private Double totalPrice;
    private Map<String, Integer> itemMap;
    private List<String> tasks;
    private String status;
    private String delivery;

    OrderRequest(String customer, Double totalPrice, Map<String, Integer> itemMap, List<String> tasks, String status,
                 String delivery) {
        this.customer = customer;
        this.totalPrice = totalPrice;
        this.itemMap = itemMap;
        this.tasks = tasks;
        this.status = status;
        this.delivery = delivery;
    }

    String getCustomer() {
        return customer;
    }

    Double getTotalPrice() {
        return totalPrice;
    }

    Map<String, Integer> getItemMap() {
        return itemMap;
    }

    List<String> getTasks() {
        return tasks;
    }

    String getStatus() {
        return status;
    }

    String getDelivery() {
        return delivery;
    }
}
