package edu.uwb.ii.warehouse.components.Employee;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends MongoRepository<EmployeeModel, String> {

    Boolean existsByEmail(String email);

    EmployeeModel findByEmail(String email);
}
