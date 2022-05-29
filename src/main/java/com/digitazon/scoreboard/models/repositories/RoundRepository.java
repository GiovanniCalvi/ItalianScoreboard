package com.digitazon.scoreboard.models.repositories;

import com.digitazon.scoreboard.models.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoundRepository extends JpaRepository<Round, Integer> {

}
