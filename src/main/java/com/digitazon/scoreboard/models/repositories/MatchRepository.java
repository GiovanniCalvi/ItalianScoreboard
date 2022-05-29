package com.digitazon.scoreboard.models.repositories;

import com.digitazon.scoreboard.models.entities.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Integer> {

}
