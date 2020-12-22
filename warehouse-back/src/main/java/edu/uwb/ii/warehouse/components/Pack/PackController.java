package edu.uwb.ii.warehouse.components.Pack;

import edu.uwb.ii.warehouse.components.Order.OrderModel;
import edu.uwb.ii.warehouse.components.Order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/packs")
public class PackController {

    @Autowired
    private final PackRepository seekRepository;
    @Autowired
    private final OrderRepository orderRepository;

    public PackController(PackRepository taskRepository, OrderRepository orderRepository) {
        this.seekRepository = taskRepository;
        this.orderRepository = orderRepository;
    }

    @CrossOrigin
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public PackModel add(@RequestBody OrderModel orderModel) {
        OrderModel orderModel1 = orderRepository.findById(orderModel.getId()).orElseThrow(NoSuchElementException::new);
        orderRepository.delete(orderModel);
        orderModel1.setStatus("ready for packing");
        orderRepository.save(orderModel1);

        return seekRepository.save(new PackModel(orderModel));
    }

    @CrossOrigin
    @GetMapping
    public List<PackModel> getAll() {
        return seekRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public PackModel getOne(@PathVariable String id) {
        return seekRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    public PackModel update(@PathVariable String id, @RequestBody OrderModel orderModel) {
        PackModel packModel = seekRepository.findById(id).orElseThrow(NoSuchElementException::new);
        packModel.setOrderModel(orderModel);
        return seekRepository.save(packModel);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        PackModel packModel = seekRepository.findById(id).orElseThrow(NoSuchElementException::new);
        seekRepository.delete(packModel);
    }
}
