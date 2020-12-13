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
    @Autowired
    private CustomEmployeeDetailsService employeeDetailsService;

    public EmployeeController(EmployeeRepository employeeRepository,
                              CustomEmployeeDetailsService employeeDetailsService) {this.employeeRepository = employeeRepository;
        this.employeeDetailsService = employeeDetailsService;
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public EmployeeModel add(@RequestBody EmployeeModel employee) {
        return employeeRepository.save(employee);
    }

    @CrossOrigin
    @GetMapping
    public List<EmployeeModel> getAll() {
        List<EmployeeModel> employeeModels = employeeRepository.findAll();
        return employeeModels;
    }

    @GetMapping(value = "/{id}")
    public EmployeeModel getOne(@PathVariable String id) {
        return employeeRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
    }

    @CrossOrigin
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
        employee.setPassword(updatedEmployee.getPassword());
        return employeeDetailsService.saveUser(employee);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        EmployeeModel employee = employeeRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
        employeeRepository.delete(employee);
    }
}
