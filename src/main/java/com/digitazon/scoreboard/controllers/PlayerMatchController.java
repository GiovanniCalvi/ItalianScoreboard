package com.digitazon.scoreboard.controllers;

import com.digitazon.scoreboard.dtos.PlayerMatchDto;
import com.digitazon.scoreboard.models.entities.Player;
import com.digitazon.scoreboard.models.entities.PlayerMatch;
import com.digitazon.scoreboard.models.services.abstractions.ScoreboardService;
import com.digitazon.scoreboard.utils.exceptions.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/player-matches")
@CrossOrigin(origins = "*")
public class PlayerMatchController {

    private ScoreboardService scoreboardService;

    @Autowired
    public PlayerMatchController(ScoreboardService scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    @GetMapping
    public ResponseEntity findAll() {
        return ResponseEntity.ok(scoreboardService.findAllPlayerMatches());
    }

    @PostMapping
    public ResponseEntity addPlayerMatch(@RequestBody PlayerMatchDto playerMatchDto) {
        PlayerMatch playerMatch = playerMatchDto.toPlayerMatch();
        return ResponseEntity.ok(scoreboardService.addPlayerMatch(playerMatch));
    }

    @GetMapping("/{id}")
    public ResponseEntity countGamePlayed(@PathVariable int id) {
        try {
            return ResponseEntity.ok(scoreboardService.countPlayerMatchByPlayer(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/won/{id}")
    public ResponseEntity countGameWon(@PathVariable int id) {
        try {
            return ResponseEntity.ok(scoreboardService.countPlayerMatchWon(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/player-{playerId}/game-{gameId}")
    public ResponseEntity countMachPlayedForGameByPlayer(@PathVariable int playerId, @PathVariable int gameId) {
        try {
            return ResponseEntity.ok(scoreboardService.countPlayerMatchByGame(playerId, gameId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/player-{playerId}/game-{gameId}/won")
    public ResponseEntity countMachWonForGameByPlayer(@PathVariable int playerId, @PathVariable int gameId) {
        try {
            return ResponseEntity.ok(scoreboardService.countPlayerMatchByGameAndHasWon(playerId, gameId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
