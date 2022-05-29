package com.digitazon.scoreboard.models.repositories;

import com.digitazon.scoreboard.models.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    Optional<Player> findByNickname(String nickname);
}
