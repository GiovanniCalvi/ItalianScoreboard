package com.digitazon.scoreboard.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "rounds")
public class Round {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rounds_generator")
    @SequenceGenerator(name = "rounds_generator", sequenceName = "rounds_id_seq",
            allocationSize = 1)
    private int id;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;

    @Column(name = "round_number")
    private int roundNumber;

    @Column
    private double score;

    public Round() {
    }

    public Round(int id, Player player, Match match, int roundNumber, double score) {
        this.id = id;
        this.player = player;
        this.match = match;
        this.roundNumber = roundNumber;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public int getRoundNumber() {
        return roundNumber;
    }

    public void setRoundNumber(int roundNumber) {
        this.roundNumber = roundNumber;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
