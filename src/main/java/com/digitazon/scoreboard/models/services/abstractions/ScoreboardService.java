package com.digitazon.scoreboard.models.services.abstractions;

import com.digitazon.scoreboard.dtos.MatchDto;
import com.digitazon.scoreboard.dtos.RoundDto;
import com.digitazon.scoreboard.models.entities.*;
import com.digitazon.scoreboard.utils.exceptions.EntityNotFoundException;
import com.digitazon.scoreboard.utils.exceptions.EntityAlreadyPresentException;

import java.util.List;

public interface ScoreboardService {

    List<Player> findAllPlayers();
    Player addPlayer(Player player) throws EntityAlreadyPresentException;
    Player updatePlayer(int id, Player updatedPlayer) throws EntityNotFoundException;
    void deletePlayer(int id) throws EntityNotFoundException;

    List<Game> findAllGames();
    Game addGame(Game game) throws EntityAlreadyPresentException;

    List<MatchDto> findAllMatches();
    Match addMatch(Match match);

    List<PlayerMatch> findAllPlayerMatches();
    PlayerMatch addPlayerMatch(PlayerMatch playerMatch);
    int countPlayerMatchByPlayer(int id) throws EntityNotFoundException;
    int countPlayerMatchWon(int id) throws EntityNotFoundException;
    int countPlayerMatchByGame(int playerId, int gameId) throws EntityNotFoundException;
    int countPlayerMatchByGameAndHasWon(int playerId, int gameId) throws EntityNotFoundException;

    List<RoundDto> findAllRounds();
    Round addRound(Round round) throws EntityNotFoundException;

    List<GameResultsStructure> findAllGameResultsStructure();
    GameResultsStructure addGameResultsStructure(GameResultsStructure gameResultsStructure);
    List<GameResultsStructure> findGameResultsStructureByGame(int gameId) throws EntityNotFoundException;

}
