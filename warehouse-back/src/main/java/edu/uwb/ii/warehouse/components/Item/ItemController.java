package edu.uwb.ii.warehouse.components.Item;

import edu.uwb.ii.warehouse.components.Order.OrderModel;
import edu.uwb.ii.warehouse.components.Order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private final ItemRepository itemRepository;
    @Autowired
    private final OrderRepository orderRepository;

    public ItemController(ItemRepository itemRepository, OrderRepository orderRepository) {
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
    }

    @CrossOrigin
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public ItemModel add(@RequestBody ItemModel item) {
        return itemRepository.save(item);
    }

    @CrossOrigin
    @GetMapping
    public List<ItemModel> getAll() {
        return itemRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public ItemModel getOne(@PathVariable String id) {
        return itemRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    public ItemModel update(@PathVariable String id, @RequestBody ItemModel updatedItem) {
        ItemModel item = itemRepository.findById(id).orElseThrow(NoSuchElementException::new);
        item.setDescription(updatedItem.getDescription());
        item.setName(updatedItem.getName());
        item.setPrice(updatedItem.getPrice());
        item.setProducer(updatedItem.getProducer());
        List<OrderModel> orders = orderRepository.findAll();
        for (OrderModel order : orders) {
            if (order.getItems().contains(item)) {
                orderRepository.delete(order);
                double sum = 0;
                for (ItemModel itemModel : order.getItems()) {
                    sum += itemModel.getPrice() * order.getMap().get(itemModel.getId());
                }
                order.setTotalPrice(sum);
                orderRepository.save(order);
            }
        }
        return itemRepository.save(item);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        ItemModel item = itemRepository.findById(id).orElseThrow(NoSuchElementException::new);
        List<OrderModel> orders = orderRepository.findAll();
        for (OrderModel order : orders) {
            if (order.getItems().contains(item)) {
                orderRepository.delete(order);
            }
        }

        itemRepository.delete(item);
    }
}