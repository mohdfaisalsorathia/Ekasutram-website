package com.ekasutram.backend.controller;

import com.ekasutram.backend.model.Resource;
import com.ekasutram.backend.model.GameQuestion;
import com.ekasutram.backend.model.Score;
import com.ekasutram.backend.service.ResourceService;
import com.ekasutram.backend.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;
    private final GameService gameService; // ✅ Injecting GameService

    public ResourceController(ResourceService resourceService, GameService gameService) {
        this.resourceService = resourceService;
        this.gameService = gameService;
    }

    // --- EXISTING RESOURCE METHODS ---

    @GetMapping
    public List<Resource> getResources(@RequestParam(required = false) String subject) {
        if (subject != null) {
            return resourceService.getResourcesBySubject(subject);
        }
        return resourceService.getAllResources();
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public Resource uploadResource(
            @RequestParam String subject,
            @RequestParam String chapterName,
            @RequestParam MultipartFile file
    ) throws IOException, InterruptedException {
        return resourceService.saveResource(subject, chapterName, file);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id)
            throws IOException, InterruptedException {
        resourceService.deleteResource(id);
        return ResponseEntity.ok().build();
    }

    // --- NEW FUN GAMES ENDPOINTS ---

    // ✅ GET the current active question for users
    @GetMapping("/game/current")
    public GameQuestion getCurrentQuestion() {
        return gameService.getCurrentQuestion();
    }

    // ✅ GET Top 10 leaderboard scores
    @GetMapping("/game/leaderboard")
    public List<Score> getLeaderboard() {
        return gameService.getTopScores();
    }

    // ✅ POST a new score when a user finishes
    @PostMapping("/game/submit-score")
    public ResponseEntity<String> submitScore(@RequestBody Score score) {
        gameService.submitScore(score);
        return ResponseEntity.ok("Score submitted!");
    }
}