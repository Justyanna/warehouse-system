package edu.uwb.ii.warehouse.components.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public TaskModel add(@RequestBody TaskModel task) {
        return taskRepository.save(task);
    }

    @CrossOrigin
    @GetMapping
    public List<TaskModel> getAll() {
        return taskRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public TaskModel getOne(@PathVariable String id) {
        return taskRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    public TaskModel update(@PathVariable String id, @RequestBody TaskModel updatedTask) {
        TaskModel task = taskRepository.findById(id).orElseThrow(NoSuchElementException::new);
        task.setDate(updatedTask.getDate());
        task.setPacker(updatedTask.getPacker());
        task.setSeeker(updatedTask.getSeeker());
        return taskRepository.save(task);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        TaskModel task = taskRepository.findById(id).orElseThrow(NoSuchElementException::new);
        taskRepository.delete(task);
    }
}