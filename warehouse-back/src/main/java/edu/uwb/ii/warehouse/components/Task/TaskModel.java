package edu.uwb.ii.warehouse.components.Task;

import edu.uwb.ii.warehouse.components.Employee.EmployeeModel;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
public class TaskModel {

    private EmployeeModel packer;
    private EmployeeModel seeker;
    private String id;
    private String date;

    public TaskModel(EmployeeModel packer, EmployeeModel seeker, String id, String date) {
        this.packer = packer;
        this.seeker = seeker;
        this.id = id;
        this.date = date;
    }

    public EmployeeModel getPacker() {
        return packer;
    }

    public void setPacker(EmployeeModel packer) {
        this.packer = packer;
    }

    public EmployeeModel getSeeker() {
        return seeker;
    }

    public void setSeeker(EmployeeModel seeker) {
        this.seeker = seeker;
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
