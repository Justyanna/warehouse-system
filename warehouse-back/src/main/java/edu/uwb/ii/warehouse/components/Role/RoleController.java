package edu.uwb.ii.warehouse.components.Role;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/roles")
public class RoleController {

    private final RoleRepository roleRepository;

    public RoleController(RoleRepository roleRepository) {this.roleRepository = roleRepository;}

    @CrossOrigin
    @GetMapping
    public List<RoleModel> getAll() {
        return roleRepository.findAll();
    }

    @CrossOrigin
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public RoleModel add(@RequestBody RoleModel role) {
        return roleRepository.save(role);
    }

}
