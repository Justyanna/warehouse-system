package edu.uwb.ii.warehouse.components.Item;

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

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

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
        return itemRepository.save(item);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        ItemModel item = itemRepository.findById(id).orElseThrow(NoSuchElementException::new);
        itemRepository.delete(item);
    }
}