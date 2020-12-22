package edu.uwb.ii.warehouse.components.Order;

import edu.uwb.ii.warehouse.components.Customer.CustomerModel;
import edu.uwb.ii.warehouse.components.Customer.CustomerRepository;
import edu.uwb.ii.warehouse.components.Item.ItemModel;
import edu.uwb.ii.warehouse.components.Item.ItemRepository;
import edu.uwb.ii.warehouse.components.OrdersHistory.OrderHistoryModel;
import edu.uwb.ii.warehouse.components.OrdersHistory.OrderHistoryRepository;
import edu.uwb.ii.warehouse.components.Task.TaskModel;
import edu.uwb.ii.warehouse.components.Task.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private final OrderRepository orderRepository;
    @Autowired
    private final TaskRepository taskRepository;
    @Autowired
    private final CustomerRepository customerRepository;
    @Autowired
    private final ItemRepository itemRepository;
    @Autowired
    private final OrderHistoryRepository orderHistoryRepository;

    public OrderController(OrderRepository orderRepository, TaskRepository taskRepository,
                           CustomerRepository customerRepository, ItemRepository itemRepository,
                           OrderHistoryRepository orderHistoryRepository) {
        this.orderRepository = orderRepository;
        this.taskRepository = taskRepository;
        this.customerRepository = customerRepository;
        this.itemRepository = itemRepository;
        this.orderHistoryRepository = orderHistoryRepository;
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public OrderModel add(@RequestBody OrderRequest orderRequest) {
        CustomerModel customer =
                customerRepository.findById(orderRequest.getCustomer()).orElseThrow(NoSuchElementException::new);
        List<TaskModel> tasks = null;

        List<ItemModel> itemModels = new ArrayList<>();
        for (String key : orderRequest.getItemMap().keySet()) {
            ItemModel itemModel = itemRepository.findById(key).orElseThrow(NoSuchElementException::new);
            itemModels.add(itemModel);
        }

        OrderModel order =
                new OrderModel(customer, itemModels, orderRequest.getItemMap(), orderRequest.getStatus(),
                               orderRequest.getDelivery());
        return orderRepository.save(order);
    }

    @CrossOrigin
    @GetMapping
    public List<OrderModel> getAll() {
        return orderRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @GetMapping(value = "/{id}")
    public OrderModel getOne(@PathVariable String id) {
        return orderRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    public OrderModel update(@PathVariable String id, @RequestBody OrderModel updatedOrder) {
        OrderModel order = orderRepository.findById(id).orElseThrow(NoSuchElementException::new);
        order.setCustomer(updatedOrder.getCustomer());
        order.setStatus(updatedOrder.getStatus());
        order.setItems(updatedOrder.getItems());
        order.setMap(updatedOrder.getMap());
        order.setDelivery(updatedOrder.getDelivery());
        double sum = 0;
        for (ItemModel item : order.getItems()) {
            sum += item.getPrice() * order.getMap().get(item.getId());
        }
        order.setTotalPrice(sum);
        return orderRepository.save(order);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        OrderModel order = orderRepository.findById(id).orElseThrow(NoSuchElementException::new);
        order.setStatus("archived");
        orderHistoryRepository.save(new OrderHistoryModel(order, new Date(System.currentTimeMillis()).toString()));
        orderRepository.delete(order);
    }
}