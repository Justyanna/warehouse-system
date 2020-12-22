package edu.uwb.ii.warehouse.components.Pack;

import edu.uwb.ii.warehouse.components.Order.OrderModel;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "packs")
public class PackModel {

    @DBRef
    private OrderModel orderModel;

    public PackModel(OrderModel orderModel) {
        this.orderModel = orderModel;
    }

    public OrderModel getOrderModel() {
        return orderModel;
    }

    public void setOrderModel(OrderModel orderModel) {
        this.orderModel = orderModel;
    }
}
