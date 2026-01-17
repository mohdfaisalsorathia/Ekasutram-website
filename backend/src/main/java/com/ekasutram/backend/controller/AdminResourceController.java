package com.ekasutram.backend.controller;

import com.ekasutram.backend.model.Resource;
import com.ekasutram.backend.service.ResourceService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin")
public class AdminResourceController {

    private final ResourceService resourceService;

    public AdminResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @PostMapping(
            value = "/upload",
            consumes = "multipart/form-data"
    )
    public Resource uploadResource(
            @RequestParam("subject") String subject,
            @RequestParam("chapterName") String chapterName,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            return resourceService.saveResource(subject, chapterName, file);
        } catch (Exception e) {
            e.printStackTrace(); // 🔥 THIS IS KEY
            throw new RuntimeException(e.getMessage());
        }
    }
}
