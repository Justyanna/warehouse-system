package edu.uwb.ii.warehouse.Pack;

import edu.uwb.ii.warehouse.components.Order.OrderModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

public class PackController {

    @Autowired
    private final PackRepository seekRepository;

    public PackController(PackRepository taskRepository) {
        this.seekRepository = taskRepository;
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public PackModel add(@RequestBody OrderModel orderModel) {
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
