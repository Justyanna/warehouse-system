package edu.uwb.ii.warehouse.components.Order;

import edu.uwb.ii.warehouse.components.Customer.CustomerModel;
import edu.uwb.ii.warehouse.components.Item.ItemModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Document(collection = "orders")
public class OrderModel {

    @Id
    private String id;
    @DBRef
    private CustomerModel customer;
    private Double totalPrice;
    @DBRef
    private List<ItemModel> items;
    private Map<String, Integer> map;
    private String status;
    private String delivery;
    private String timestamp;


    public OrderModel(CustomerModel customer, List<ItemModel> items, Map<String, Integer> map,
                      String status, String delivery) {
        this.customer = customer;
        this.items = items;
        this.map = map;
        this.status = status;
        this.delivery = delivery;
        double sum = 0;
        for (ItemModel item : items) {
            sum += item.getPrice() * this.map.get(item.getId());
        }
        this.timestamp = new Date(System.currentTimeMillis()).toString();
        this.totalPrice = sum;
    }


    @Override
    public int hashCode() {
        return Objects.hash(id, customer, totalPrice, items, map, status, delivery);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrderModel that = (OrderModel) o;
        return Objects.equals(id, that.id);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CustomerModel getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerModel customer) {
        this.customer = customer;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ItemModel> getItems() {
        return items;
    }

    public void setItems(List<ItemModel> items) {
        this.items = items;
    }

    public Map<String, Integer> getMap() {
        return map;
    }

    public void setMap(Map<String, Integer> map) {
        this.map = map;
    }

    public String getDelivery() {
        return delivery;
    }

    public void setDelivery(String delivery) {
        this.delivery = delivery;
    }
}
