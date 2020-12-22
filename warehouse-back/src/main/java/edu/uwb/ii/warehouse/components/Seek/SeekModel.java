package edu.uwb.ii.warehouse.components.Seek;

import edu.uwb.ii.warehouse.components.Order.OrderModel;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "seeks")
public class SeekModel {

    @DBRef
    private OrderModel orderModel;

    public SeekModel(OrderModel orderModel) {
        this.orderModel = orderModel;
    }

    public OrderModel getOrderModel() {
        return orderModel;
    }

    public void setOrderModel(OrderModel orderModel) {
        this.orderModel = orderModel;
    }
}
