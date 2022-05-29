package com.digitazon.scoreboard.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "player_matches")
public class PlayerMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "player_matches_generator")
    @SequenceGenerator(name = "player_matches_generator", sequenceName = "player_matches_id_seq",
            allocationSize = 1)
    private int id;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    @Column(name = "has_won")
    private boolean hasWon;

    @Column
    private double score;

    public PlayerMatch() {
    }

    public PlayerMatch(int id, Match match, Player player, boolean hasWon, double score) {
        this.id = id;
        this.match = match;
        this.player = player;
        this.hasWon = hasWon;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public boolean isHasWon() {
        return hasWon;
    }

    public void setHasWon(boolean hasWon) {
        this.hasWon = hasWon;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
