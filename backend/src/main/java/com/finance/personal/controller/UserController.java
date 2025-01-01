package com.finance.personal.controller;

import com.finance.personal.entity.UserProfile;
import com.finance.personal.model.UserRequestModel;
import com.finance.personal.model.UserResultModel;
import com.finance.personal.service.PersonalFinanceService;
import com.finance.personal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private PersonalFinanceService personalFinanceService; 

    @PostMapping("/login-user")
    public ResponseEntity<UserResultModel> getUserByIdAndPassword(@RequestBody UserRequestModel userReq) {
        return  ResponseEntity.ok(userService.findUserByIdAndPasword(userReq.getId(), userReq.getPassword()));
    }
    
    @PostMapping("/get-user")
    public ResponseEntity<UserResultModel> getUserById(@RequestBody UserRequestModel userReq) {
        return  ResponseEntity.ok(userService.findUserById(userReq.getId()));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResultModel> registerUser(@RequestBody UserProfile userProfile) {
        if (userService.existsByEmail(userProfile.getEmail())) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(userService.saveUser(userProfile));
    }
    
    @PostMapping("/update")
    public ResponseEntity<UserResultModel> updateUser(@RequestBody UserProfile userProfile) {
        if (!userService.existsByEmail(userProfile.getId())) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(userService.saveUser(userProfile));
    }
}
