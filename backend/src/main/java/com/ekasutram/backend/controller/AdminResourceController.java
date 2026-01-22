package com.ekasutram.backend.controller;

import com.ekasutram.backend.model.Resource;
import com.ekasutram.backend.model.GameQuestion;
import com.ekasutram.backend.service.ResourceService;
import com.ekasutram.backend.service.GameService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // Allows the admin frontend to communicate with this controller
public class AdminResourceController {

    private final ResourceService resourceService;
    private final GameService gameService; // ✅ Inject GameService

    public AdminResourceController(ResourceService resourceService, GameService gameService) {
        this.resourceService = resourceService;
        this.gameService = gameService;
    }

    // ✅ EXISTING: Upload Study Resources (PDFs/Images)
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
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    // ✅ NEW: Upload Fun Game Question
    // This endpoint accepts JSON from the Admin Resource page
    @PostMapping("/game/upload")
    public String uploadGameQuestion(@RequestBody GameQuestion question) {
        try {
            gameService.updateGame(question);
            return "New game question uploaded and leaderboard reset successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload game: " + e.getMessage());
        }
    }
}