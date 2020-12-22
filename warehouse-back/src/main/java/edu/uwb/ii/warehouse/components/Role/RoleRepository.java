package edu.uwb.ii.warehouse.components.Role;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<RoleModel, String> {

    RoleModel findByRole(RoleEnum role);
}