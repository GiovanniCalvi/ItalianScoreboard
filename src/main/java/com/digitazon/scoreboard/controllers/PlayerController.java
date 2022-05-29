package com.digitazon.scoreboard.controllers;

import com.digitazon.scoreboard.models.entities.Player;
import com.digitazon.scoreboard.models.services.abstractions.ScoreboardService;
import com.digitazon.scoreboard.utils.exceptions.EntityNotFoundException;
import com.digitazon.scoreboard.utils.exceptions.EntityAlreadyPresentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/player")
@CrossOrigin(origins = "*")
public class PlayerController {

    private ScoreboardService scoreboardService;

    @Autowired
    public PlayerController(ScoreboardService scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    @GetMapping
    public ResponseEntity getAllPlayers() {
        return ResponseEntity.ok(scoreboardService.findAllPlayers());
    }

    @PostMapping
    public ResponseEntity addPlayer(@RequestBody Player player) {
        try {
            return ResponseEntity.ok(scoreboardService.addPlayer(player));
        } catch (EntityAlreadyPresentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity editPlayer(@PathVariable int id, @RequestBody Player updatedPlayer) {
        try {
            return ResponseEntity.ok(scoreboardService.updatePlayer(id, updatedPlayer));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePlayer(@PathVariable int id) {
        try {
            scoreboardService.deletePlayer(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
