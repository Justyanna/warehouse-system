package edu.uwb.ii.warehouse.components.Auth;

import edu.uwb.ii.warehouse.components.Employee.CustomEmployeeDetailsService;
import edu.uwb.ii.warehouse.components.Employee.EmployeeModel;
import edu.uwb.ii.warehouse.components.Employee.EmployeeRepository;
import edu.uwb.ii.warehouse.components.Role.RoleEnum;
import edu.uwb.ii.warehouse.components.Role.RoleModel;
import edu.uwb.ii.warehouse.config.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import static org.springframework.http.ResponseEntity.ok;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Map<String, String> tokenEmailMap = new HashMap<>();
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    EmployeeRepository employees;
    @Autowired
    private CustomEmployeeDetailsService employeeDetailsService;

    @SuppressWarnings("rawtypes")
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthBody data) {
        try {
            String username = data.getEmail();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            String token = jwtTokenProvider.createToken(username, this.employees.findByEmail(username).getRoles());
            Map<Object, Object> model = new HashMap<>();
            model.put("user", username);
            model.put("token", token);
            tokenEmailMap.put(token + "=", username);
            return ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid email/password supplied");
        }
    }

    @SuppressWarnings("rawtypes")
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody EmployeeModel user) {
        EmployeeModel userExists = employeeDetailsService.findUserByEmail(user.getEmail());
        if (userExists != null) {
            throw new BadCredentialsException("User with username: " + user.getEmail() + " already exists");
        }
        employeeDetailsService.saveUser(user);
        Map<Object, Object> model = new HashMap<>();
        model.put("message", "User registered successfully");
        return ok(model);
    }

    @PostMapping("/verify")
    public ResponseEntity verify(@RequestBody String token) {
        if (tokenEmailMap.keySet().contains(token)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/isAdmin")
    public ResponseEntity isAdmin(@RequestBody String token) {
        String email = tokenEmailMap.get(token);
        EmployeeModel userExists = employeeDetailsService.findUserByEmail(email);
        if (userExists != null) {
            Set<RoleModel> roles = userExists.getRoles();
            for (RoleModel role : roles) {
                if (role.getRole().equals(RoleEnum.ADMIN.toString())) {
                    return new ResponseEntity(HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/isManager")
    public ResponseEntity isManager(@RequestBody String token) {
        String email = tokenEmailMap.get(token);
        EmployeeModel userExists = employeeDetailsService.findUserByEmail(email);
        if (userExists != null) {
            Set<RoleModel> roles = userExists.getRoles();
            for (RoleModel role : roles) {
                if (role.getRole().equals(RoleEnum.MANAGER.toString())) {
                    return new ResponseEntity(HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/isPacker")
    public ResponseEntity isPacker(@RequestBody String token) {
        String email = tokenEmailMap.get(token);
        EmployeeModel userExists = employeeDetailsService.findUserByEmail(email);
        if (userExists != null) {
            if (userExists.getPosition() == "packer" || userExists.getPosition() == "paccker") {
                return new ResponseEntity(HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/isSeeker")
    public ResponseEntity isSeeker(@RequestBody String token) {
        String email = tokenEmailMap.get(token);
        EmployeeModel userExists = employeeDetailsService.findUserByEmail(email);
        if (userExists != null) {
            if (userExists.getPosition() == "seeker") {
                return new ResponseEntity(HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}