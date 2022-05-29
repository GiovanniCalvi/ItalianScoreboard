package com.digitazon.scoreboard.models.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "matches_generator")
    @SequenceGenerator(name = "matches_generator", sequenceName = "matches_id_seq",
            allocationSize = 1)
    private int id;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Column
    private LocalDateTime date;

    public Match() {
    }

    public Match(int id, Game game, LocalDateTime date) {
        this.id = id;
        this.game = game;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
