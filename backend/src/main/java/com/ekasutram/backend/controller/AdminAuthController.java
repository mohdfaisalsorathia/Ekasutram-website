package com.ekasutram.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminAuthController {

    // Simple plain-text password stored on the backend
    private final String ADMIN_PASSWORD = "VIT@Ekasutram";

    @PostMapping("/verify-password")
    public ResponseEntity<String> verifyPassword(@RequestBody Map<String, String> payload) {
        String inputPassword = payload.get("password");

        if (ADMIN_PASSWORD.equals(inputPassword)) {
            return ResponseEntity.ok("Authenticated");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Password");
        }
    }
}