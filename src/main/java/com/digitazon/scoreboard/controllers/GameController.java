package com.digitazon.scoreboard.controllers;

import com.digitazon.scoreboard.models.entities.Game;
import com.digitazon.scoreboard.models.services.abstractions.ScoreboardService;
import com.digitazon.scoreboard.utils.exceptions.EntityAlreadyPresentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "*")
public class GameController {
    private ScoreboardService scoreboardService;

    @Autowired
    public GameController(ScoreboardService scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    @GetMapping
    public ResponseEntity findAllGames() {
        return ResponseEntity.ok(scoreboardService.findAllGames());
    }

    @PostMapping
    public ResponseEntity addGame(@RequestBody Game game) {
        try {
            return ResponseEntity.ok(scoreboardService.addGame(game));
        } catch (EntityAlreadyPresentException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
