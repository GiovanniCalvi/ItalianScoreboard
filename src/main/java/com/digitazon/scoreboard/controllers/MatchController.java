package com.digitazon.scoreboard.controllers;

import com.digitazon.scoreboard.dtos.MatchDto;
import com.digitazon.scoreboard.models.entities.Match;
import com.digitazon.scoreboard.models.services.abstractions.ScoreboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/match")
@CrossOrigin(origins = "*")
public class MatchController {
    private ScoreboardService scoreboardService;

    @Autowired
    public MatchController(ScoreboardService scoreboardService) {
        this.scoreboardService = scoreboardService;
    }

    @GetMapping
    public ResponseEntity findAll() {
        return ResponseEntity.ok(scoreboardService.findAllMatches());
    }

    @PostMapping
    public ResponseEntity addMatch(@RequestBody MatchDto matchDto) {
        return ResponseEntity.ok(scoreboardService.addMatch(matchDto.toMatch()));
    }
}
