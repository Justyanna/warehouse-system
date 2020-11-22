package edu.uwb.ii.warehouse.components.Employee;

import edu.uwb.ii.warehouse.components.Role.RoleModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "employees")
public class EmployeeModel {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    @Indexed(unique = true)
    private String email;

    private String password;
    private String phoneNumber;
    private Double salary;
    private String position;
    @DBRef
    private Set<RoleModel> roles;

    public EmployeeModel(String id, String firstName, String lastName, String email, String password,
                         String phoneNumber, Double salary, String position, Set<RoleModel> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.salary = salary;
        this.position = position;
        this.roles = roles;
    }



    String getId() {
        return id;
    }

    String getFirstName() {
        return firstName;
    }

    void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    String getLastName() {
        return lastName;
    }

    void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    void setEmail(String email) {
        this.email = email;
    }

    String getPhoneNumber() {
        return phoneNumber;
    }

    void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    Double getSalary() {
        return salary;
    }

    void setSalary(Double salary) {
        this.salary = salary;
    }

    String getPosition() {
        return position;
    }

    void setPosition(String position) {
        this.position = position;
    }

    void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    void setPassword(String password) {
        this.password = password;
    }


    public Set<RoleModel> getRoles() {
        return roles;
    }

    void setRoles(Set<RoleModel> roles) {
        this.roles = roles;
    }
}
