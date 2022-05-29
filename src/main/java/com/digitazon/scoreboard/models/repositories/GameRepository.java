package com.digitazon.scoreboard.models.repositories;

import com.digitazon.scoreboard.models.entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Integer> {
    Optional<Game> findByName(String name);
}
