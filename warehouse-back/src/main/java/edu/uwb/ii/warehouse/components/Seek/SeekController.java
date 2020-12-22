package edu.uwb.ii.warehouse.components.Seek;

import edu.uwb.ii.warehouse.components.Order.OrderModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/seeks")
public class SeekController {

    @Autowired
    private final SeekRepository seekRepository;

    public SeekController(SeekRepository taskRepository) {
        this.seekRepository = taskRepository;
    }

    @CrossOrigin
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public SeekModel add(@RequestBody OrderModel orderModel) {
        return seekRepository.save(new SeekModel(orderModel));
    }


    @CrossOrigin
    @GetMapping
    public List<SeekModel> getAll() {
        return seekRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public SeekModel getOne(@PathVariable String id) {
        return seekRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    public SeekModel update(@PathVariable String id, @RequestBody OrderModel orderModel) {
        SeekModel seekModel = seekRepository.findById(id).orElseThrow(NoSuchElementException::new);
        seekModel.setOrderModel(orderModel);
        return seekRepository.save(seekModel);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        SeekModel seekModel = seekRepository.findById(id).orElseThrow(NoSuchElementException::new);
        seekRepository.delete(seekModel);
    }
}
