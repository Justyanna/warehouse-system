package edu.uwb.ii.warehouse.components.Order;

import edu.uwb.ii.warehouse.components.Customer.CustomerModel;
import edu.uwb.ii.warehouse.components.Item.ItemModel;
import edu.uwb.ii.warehouse.components.Task.TaskModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

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
    private List<TaskModel> tasks;
    private String status;
    private String delivery;

    public OrderModel(CustomerModel customer, List<ItemModel> items, Map<String, Integer> map, List<TaskModel> tasks,
                      String status, String delivery) {
        this.customer = customer;
        this.items = items;
        this.map = map;
        this.tasks = tasks;
        this.status = status;
        this.delivery = delivery;
        double sum = 0;
        for (ItemModel item : items) {
            sum += item.getPrice() * this.map.get(item.getId());
        }
        this.totalPrice = sum;
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

    public List<TaskModel> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskModel> tasks) {
        this.tasks = tasks;
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
