package com.digitazon.scoreboard.controllers;

import com.digitazon.scoreboard.dtos.RoundDto;
import com.digitazon.scoreboard.models.entities.Round;
import com.digitazon.scoreboard.models.services.abstractions.ScoreboardService;
import com.digitazon.scoreboard.utils.exceptions.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/round")
@CrossOrigin(origins = "*")
public class RoundController {

    private ScoreboardService scoreboardService;

    @Autowired
    public RoundController(ScoreboardService scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    @GetMapping
    public ResponseEntity findAll() {
        return ResponseEntity.ok(scoreboardService.findAllRounds());
    }

    @PostMapping
    public ResponseEntity addRound(@RequestBody RoundDto roundDto) {
        try {
            return ResponseEntity.ok(scoreboardService.addRound(roundDto.toRound()));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
