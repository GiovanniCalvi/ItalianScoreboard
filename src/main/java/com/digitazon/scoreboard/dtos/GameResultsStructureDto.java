package com.digitazon.scoreboard.dtos;

import com.digitazon.scoreboard.models.entities.Game;
import com.digitazon.scoreboard.models.entities.GameResultsStructure;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class GameResultsStructureDto {

    private int id;
    private Integer gameId;
    private String gameName;
    private int rowNumber;
    private String rowName;

    public GameResultsStructureDto() {
    }

    public GameResultsStructureDto(int id, Integer gameId, String gameName, int rowNumber, String rowName) {
        this.id = id;
        this.gameId = gameId;
        this.gameName = gameName;
        this.rowNumber = rowNumber;
        this.rowName = rowName;
    }

    public GameResultsStructure toGameResultsStructure() {
        Game game = new Game();
        game.setId(gameId);
        game.setName(gameName);
        GameResultsStructure gameResultsStructure = new GameResultsStructure();
        gameResultsStructure.setId(id);
        gameResultsStructure.setGame(game);
        gameResultsStructure.setRowNumber(rowNumber);
        gameResultsStructure.setRowName(rowName);
        return gameResultsStructure;
    }

    public static GameResultsStructureDto fromGameResultsStructure(GameResultsStructure gameResultsStructure) {
        return new GameResultsStructureDto(gameResultsStructure.getId(), gameResultsStructure.getGame().getId(),
                gameResultsStructure.getGame().getName(), gameResultsStructure.getRowNumber(),
                gameResultsStructure.getRowName());
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

    public int getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(int rowNumber) {
        this.rowNumber = rowNumber;
    }

    public String getRowName() {
        return rowName;
    }

    public void setRowName(String rowName) {
        this.rowName = rowName;
    }
}
