package edu.uwb.ii.warehouse.components.OrdersHistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/ordersHistory")
public class OrderHistoryController {

    @Autowired
    private final OrderHistoryRepository orderHistoryRepository;

    public OrderHistoryController(OrderHistoryRepository orderHistoryRepository) {
        this.orderHistoryRepository = orderHistoryRepository;
    }

    @CrossOrigin
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public OrderHistoryModel add(@RequestBody OrderHistoryModel orderHistory) {
        return orderHistoryRepository.save(orderHistory);
    }

    @CrossOrigin
    @DeleteMapping
    public void deleteAll() {
        orderHistoryRepository.deleteAll();
    }

    @CrossOrigin
    @GetMapping
    public List<OrderHistoryModel> getAll() {
        return orderHistoryRepository.findAll();
    }

    @CrossOrigin
    @GetMapping(value = "/{id}")
    public OrderHistoryModel getOne(@PathVariable String id) {
        return orderHistoryRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    public OrderHistoryModel update(@PathVariable String id, @RequestBody OrderHistoryModel updatedOrderHistory) {
        OrderHistoryModel orderHistory = orderHistoryRepository.findById(id).orElseThrow(NoSuchElementException::new);
        orderHistory.setOrder(updatedOrderHistory.getOrder());
        orderHistory.setTimestamp(updatedOrderHistory.getTimestamp());
        return orderHistoryRepository.save(orderHistory);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        OrderHistoryModel orderHistory = orderHistoryRepository.findById(id).orElseThrow(NoSuchElementException::new);
        orderHistoryRepository.delete(orderHistory);
    }
}