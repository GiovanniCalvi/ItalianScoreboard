package com.digitazon.scoreboard.dtos;

import com.digitazon.scoreboard.models.entities.Match;
import com.digitazon.scoreboard.models.entities.Player;
import com.digitazon.scoreboard.models.entities.PlayerMatch;

public class PlayerMatchDto {

    private int id;
    private Integer matchId;
    private Integer playerId;
    private boolean hasWon;
    private Double score;

    public PlayerMatchDto() {
    }

    public PlayerMatchDto(int id, Integer matchId, Integer playerId, boolean hasWon, Double score) {
        this.id = id;
        this.matchId = matchId;
        this.playerId = playerId;
        this.hasWon = hasWon;
        this.score = score;
    }

    public PlayerMatch toPlayerMatch() {
        Match match = new Match();
        match.setId(matchId);
        Player player = new Player();
        player.setId(playerId);
        PlayerMatch playerMatch = new PlayerMatch();
        playerMatch.setId(id);
        playerMatch.setMatch(match);
        playerMatch.setPlayer(player);
        playerMatch.setHasWon(hasWon);
        if (score != null) {
            playerMatch.setScore(score);
        }
        return playerMatch;
    }

    public static PlayerMatchDto fromPlayerMatch(PlayerMatch playerMatch) {
        return new PlayerMatchDto(playerMatch.getId(), playerMatch.getMatch().getId(), playerMatch.getPlayer().getId(),
                playerMatch.isHasWon(), playerMatch.getScore());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getMatchId() {
        return matchId;
    }

    public void setMatchId(Integer matchId) {
        this.matchId = matchId;
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public boolean isHasWon() {
        return hasWon;
    }

    public void setHasWon(boolean hasWon) {
        this.hasWon = hasWon;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
