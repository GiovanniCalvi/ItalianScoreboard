package com.digitazon.scoreboard.models.repositories;

import com.digitazon.scoreboard.models.entities.Game;
import com.digitazon.scoreboard.models.entities.GameResultsStructure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameResultStructureRepository extends JpaRepository<GameResultsStructure, Integer> {
    List<GameResultsStructure> findByGame(Game game);
}
