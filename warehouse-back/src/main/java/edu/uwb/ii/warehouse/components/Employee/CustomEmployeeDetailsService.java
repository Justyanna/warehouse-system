package edu.uwb.ii.warehouse.components.Employee;

import edu.uwb.ii.warehouse.components.Role.RoleEnum;
import edu.uwb.ii.warehouse.components.Role.RoleModel;
import edu.uwb.ii.warehouse.components.Role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

public class CustomEmployeeDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    public EmployeeModel findUserByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    public void saveUser(EmployeeModel user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        RoleModel userRole = roleRepository.findByRole(RoleEnum.ADMIN);
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
        employeeRepository.save(user);
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        EmployeeModel employee = employeeRepository.findByEmail(email);
        if(employee != null) {
            List<GrantedAuthority> authorities = getUserAuthority(employee.getRoles());
            return buildUserForAuthentication(employee, authorities);
        } else {
            throw new UsernameNotFoundException("username not found");
        }
    }

    private List<GrantedAuthority> getUserAuthority(Set<RoleModel> userRoles) {
        Set<GrantedAuthority> roles = new HashSet<>();
        userRoles.forEach((role) -> {
            roles.add(new SimpleGrantedAuthority(role.getRole()));
        });

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>(roles);
        return grantedAuthorities;
    }

    private UserDetails buildUserForAuthentication(EmployeeModel employeeModel, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(employeeModel.getEmail(), employeeModel.getPassword(), authorities);
    }
}
