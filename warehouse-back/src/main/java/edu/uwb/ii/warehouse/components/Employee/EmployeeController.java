package edu.uwb.ii.warehouse.components.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {this.employeeRepository = employeeRepository;}

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public EmployeeModel add(@RequestBody EmployeeModel employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping
    public List<EmployeeModel> getAll() {
        return employeeRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public EmployeeModel getOne(@PathVariable String id) {
        return employeeRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
    }

    @PutMapping(value = "/{id}")
    public EmployeeModel update(@PathVariable String id, @RequestBody EmployeeModel updatedEmployee) {
        EmployeeModel employee = employeeRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setPassword(updatedEmployee.getPassword());
        employee.setPhoneNumber(updatedEmployee.getPhoneNumber());
        employee.setSalary(updatedEmployee.getSalary());
        employee.setPosition(updatedEmployee.getPosition());
        return employeeRepository.save(employee);
    }

}
