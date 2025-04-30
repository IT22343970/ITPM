package com.example.mymanager.controller;

import com.example.mymanager.model.User;
import com.example.mymanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UserService userService;

    // Add a root endpoint mapping
    @GetMapping("")  // This will handle /api/auth
    public String root() {
        return "Auth API is working!";
    }

    @GetMapping("/test")
    public String test() {
        return "Auth endpoint is working!";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            User user = userService.findByUsernameOrEmail(
                loginRequest.getUsername(), 
                loginRequest.getEmail()
            );
            
            if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
                // Remove password before sending response
                user.setPassword(null);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid credentials"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("message", "An error occurred during login"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            // Remove password before sending response
            savedUser.setPassword(null);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Collections.singletonMap("message", e.getMessage()));
        }
    }
}