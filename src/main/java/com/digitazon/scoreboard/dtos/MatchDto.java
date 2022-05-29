package com.digitazon.scoreboard.dtos;

import com.digitazon.scoreboard.models.entities.Game;
import com.digitazon.scoreboard.models.entities.Match;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class MatchDto {
    private int id;

    private Integer gameId;
    private String gameName;

    private String date;

    public MatchDto() {
    }

    public MatchDto(int id, Integer gameId, String gameName, String date) {
        this.id = id;
        this.gameId = gameId;
        this.gameName = gameName;
        this.date = date;
    }

    public Match toMatch() {
        Game g = new Game();
        g.setId(gameId);
        g.setName(gameName);
        Match m = new Match();
        m.setGame(g);
        System.out.println(date);
        m.setDate(LocalDateTime.parse(date));
        m.setId(id);
        return m;
    }

    public static MatchDto fromMatch(Match match) {
        return new MatchDto(match.getId(), match.getGame().getId(), match.getGame().getName(), match.getDate().toString());
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
