package edu.uwb.ii.warehouse.components.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {this.customerRepository = customerRepository;}

    @CrossOrigin
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CustomerModel add(@RequestBody CustomerModel customer) {
        return customerRepository.save(customer);
    }

    @CrossOrigin
    @GetMapping
    public List<CustomerModel> getAll() {
        return customerRepository.findAll();
    }

    @CrossOrigin
    @GetMapping(value = "/{id}")
    public CustomerModel getOne(@PathVariable String id) {
        return customerRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    public CustomerModel update(@PathVariable String id, @RequestBody CustomerModel updatedCustomer) {
        CustomerModel customer = customerRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
        customer.setCustomerName(updatedCustomer.getCustomerName());
        customer.setEmail(updatedCustomer.getEmail());
        customer.setPhoneNumber(updatedCustomer.getPhoneNumber());
        customer.setAddress(updatedCustomer.getAddress());
        return customerRepository.save(customer);
    }
}
