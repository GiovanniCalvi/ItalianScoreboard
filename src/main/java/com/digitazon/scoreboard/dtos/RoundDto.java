package com.digitazon.scoreboard.dtos;

import com.digitazon.scoreboard.models.entities.Match;
import com.digitazon.scoreboard.models.entities.Player;
import com.digitazon.scoreboard.models.entities.Round;

public class RoundDto {
    private int id;
    private int playerId;
    private Integer matchId;
    private int roundNumber;
    private double score;

    public RoundDto() {
    }

    public RoundDto(int id, int playerId, Integer matchId, int roundNumber, double score) {
        this.id = id;
        this.playerId = playerId;
        this.matchId = matchId;
        this.roundNumber = roundNumber;
        this.score = score;
    }

    public Round toRound() {
        Player p = new Player();
        p.setId(playerId);
        Match m = new Match();
        m.setId(matchId);
        Round r = new Round();
        r.setPlayer(p);
        r.setMatch(m);
        r.setId(id);
        r.setRoundNumber(roundNumber);
        r.setScore(score);
        return r;
    }

    public static RoundDto fromRound(Round round) {
        return new RoundDto(round.getId(), round.getPlayer().getId(), round.getMatch().getId(), round.getRoundNumber(),
                round.getScore());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public Integer getMatchId() {
        return matchId;
    }

    public void setMatchId(Integer matchId) {
        this.matchId = matchId;
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
