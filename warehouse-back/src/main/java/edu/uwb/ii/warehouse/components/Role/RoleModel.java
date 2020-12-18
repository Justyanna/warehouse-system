package edu.uwb.ii.warehouse.components.Role;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class RoleModel {

    @Id
    private String id;
    private String role;

    public RoleModel(String id) {
        this.id = id;
        this.role = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}