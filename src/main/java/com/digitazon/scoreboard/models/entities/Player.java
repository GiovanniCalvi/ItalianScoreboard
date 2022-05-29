package com.digitazon.scoreboard.models.entities;

import javax.persistence.*;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "players_generator")
    @SequenceGenerator(name = "players_generator", sequenceName = "players_id_seq",
            allocationSize = 1)
    private int id;

    @Column
    private String name;

    @Column
    private String lastname;

    @Column
    private String nickname;

    @Column
    private String password;

    public Player() {
    }

    public Player(int id, String name, String lastname, String nickname, String password) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.nickname = nickname;
        this.password = password;
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

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
