package edu.uwb.ii.warehouse.components.OrdersHistory;

import edu.uwb.ii.warehouse.components.Order.OrderModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ordersHistory")
public class OrderHistoryModel {

    @Id
    private String id;
    private OrderModel order;
    private String timestamp;

    public OrderHistoryModel(OrderModel order, String timestamp) {
        this.order = order;
        this.timestamp = timestamp;
    }

    public String getId() {
        return id;
    }

    public OrderModel getOrder() {
        return order;
    }

    public void setOrder(OrderModel order) {
        this.order = order;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
