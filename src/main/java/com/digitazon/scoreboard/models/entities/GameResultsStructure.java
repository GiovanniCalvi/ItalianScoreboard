package com.digitazon.scoreboard.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "game_results_structure")
public class GameResultsStructure {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "game_results_structure_generator")
    @SequenceGenerator(name = "game_results_structure_generator", sequenceName = "game_results_structure_id_seq",
            allocationSize = 1)
    private int id;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(name = "row_number")
    private int rowNumber;

    @Column(name = "row_name")
    private String rowName;

    public GameResultsStructure() {
    }

    public GameResultsStructure(int id, Game game, int rowNumber, String rowName) {
        this.id = id;
        this.game = game;
        this.rowNumber = rowNumber;
        this.rowName = rowName;
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
