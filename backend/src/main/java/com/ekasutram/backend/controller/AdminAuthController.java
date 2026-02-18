package com.ekasutram.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminAuthController {

    // Injected from .env -> application.properties
    @Value("${admin.password}")
    private String adminPassword;

    @PostMapping("/verify-password")
    public ResponseEntity<String> verifyPassword(@RequestBody Map<String, String> payload) {
        String inputPassword = payload.get("password");

        // Use the injected variable instead of a hardcoded string
        if (adminPassword != null && adminPassword.equals(inputPassword)) {
            return ResponseEntity.ok("Authenticated");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Password");
        }
    }
}