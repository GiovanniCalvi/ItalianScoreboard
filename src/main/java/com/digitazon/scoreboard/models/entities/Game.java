package com.digitazon.scoreboard.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "games_generator")
    @SequenceGenerator(name = "games_generator", sequenceName = "games_id_seq",
            allocationSize = 1)
    private int id;

    @Column
    private String name;

    public Game() {
    }

    public Game(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
