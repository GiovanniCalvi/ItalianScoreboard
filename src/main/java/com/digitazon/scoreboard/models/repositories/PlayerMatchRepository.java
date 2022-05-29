package com.digitazon.scoreboard.models.repositories;

import com.digitazon.scoreboard.models.entities.Game;
import com.digitazon.scoreboard.models.entities.Player;
import com.digitazon.scoreboard.models.entities.PlayerMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlayerMatchRepository extends JpaRepository<PlayerMatch, Integer> {
    List<PlayerMatch> findAllByPlayer(Player player);
    int countByPlayer(Player player);
    int countByPlayerAndHasWon(Player player, boolean hasWon);

    @Query("SELECT count(*) from Player P JOIN PlayerMatch PM on P = PM.player JOIN Match M on M = PM.match " +
            "JOIN Game G on G = M.game  WHERE P.id = ?1 and G.id = ?2")
    int countByPlayerAndGame(int playerId, int gameId);

    @Query("SELECT count(*) from Player P JOIN PlayerMatch PM on P = PM.player JOIN Match M on M = PM.match " +
            "JOIN Game G on G = M.game  WHERE P.id = ?1 and G.id = ?2 and PM.hasWon = true")
    int countByPlayerAndGameAndHasWon(int playerId, int gameId);
}
