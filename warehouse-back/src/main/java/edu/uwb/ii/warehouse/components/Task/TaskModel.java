package edu.uwb.ii.warehouse.components.Task;

import edu.uwb.ii.warehouse.components.Employee.EmployeeModel;
import edu.uwb.ii.warehouse.components.Order.OrderModel;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
public class TaskModel {

    @DBRef
    private EmployeeModel employeeModel;
    @DBRef
    private OrderModel orderModel;
    private String id;
    private String date;
    private String type;

    public TaskModel(EmployeeModel employeeModel, OrderModel orderModel, String id, String date, String type) {
        this.employeeModel = employeeModel;
        this.orderModel = orderModel;
        this.id = id;
        this.date = date;
        this.type = type;
    }

    public OrderModel getOrderModel() {
        return orderModel;
    }

    public String getType() {
        return type;
    }

    public EmployeeModel getEmployeeModel() {
        return employeeModel;
    }

    public void setEmployeeModel(EmployeeModel employeeModel) {
        this.employeeModel = employeeModel;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
