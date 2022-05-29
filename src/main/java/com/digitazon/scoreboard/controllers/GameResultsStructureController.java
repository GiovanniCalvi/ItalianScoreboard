package com.digitazon.scoreboard.controllers;

import com.digitazon.scoreboard.dtos.GameResultsStructureDto;
import com.digitazon.scoreboard.models.entities.Game;
import com.digitazon.scoreboard.models.services.abstractions.ScoreboardService;
import com.digitazon.scoreboard.utils.exceptions.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game-results-structure")
@CrossOrigin(origins = "*")
public class GameResultsStructureController {

    private ScoreboardService scoreboardService;

    @Autowired
    public GameResultsStructureController(ScoreboardService scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    @GetMapping
    public ResponseEntity findAll() {
        return ResponseEntity.ok(scoreboardService.findAllGameResultsStructure());
    }

    @PostMapping
    public ResponseEntity addGameResultsStructure(@RequestBody GameResultsStructureDto gameResultsStructureDto) {
        var gameResultsStructure = gameResultsStructureDto.toGameResultsStructure();
        return ResponseEntity.ok(scoreboardService.addGameResultsStructure(gameResultsStructure));
    }

    @GetMapping("/{gameId}")
    public ResponseEntity findByGame(@PathVariable int gameId) {
        try {
            return ResponseEntity.ok(scoreboardService.findGameResultsStructureByGame(gameId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
