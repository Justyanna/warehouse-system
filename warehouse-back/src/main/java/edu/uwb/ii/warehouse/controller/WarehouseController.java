package edu.uwb.ii.warehouse.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WarehouseController {


    @GetMapping("/heartbeat")
    ResponseEntity<String> returnStatusOk() {
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
