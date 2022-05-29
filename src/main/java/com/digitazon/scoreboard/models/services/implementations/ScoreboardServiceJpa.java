package com.digitazon.scoreboard.models.services.implementations;

import com.digitazon.scoreboard.dtos.MatchDto;
import com.digitazon.scoreboard.dtos.RoundDto;
import com.digitazon.scoreboard.models.entities.*;
import com.digitazon.scoreboard.models.repositories.*;
import com.digitazon.scoreboard.models.services.abstractions.ScoreboardService;
import com.digitazon.scoreboard.utils.exceptions.EntityNotFoundException;
import com.digitazon.scoreboard.utils.exceptions.EntityAlreadyPresentException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScoreboardServiceJpa implements ScoreboardService {

    private GameRepository gameRepository;
    private MatchRepository matchRepository;
    private PlayerRepository playerRepository;
    private GameResultStructureRepository gameResultStructureRepository;
    private PlayerMatchRepository playerMatchRepository;
    private RoundRepository roundRepository;

    public ScoreboardServiceJpa(GameRepository gameRepository, MatchRepository matchRepository,
                                PlayerRepository playerRepository, GameResultStructureRepository gameResultStructureRepository,
                                PlayerMatchRepository playerMatchRepository, RoundRepository roundRepository) {
        this.gameRepository = gameRepository;
        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
        this.gameResultStructureRepository = gameResultStructureRepository;
        this.playerMatchRepository = playerMatchRepository;
        this.roundRepository = roundRepository;
    }

    @Override
    public List<Player> findAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public Player addPlayer(Player player) throws EntityAlreadyPresentException {
        var OptUser = playerRepository.findByNickname(player.getNickname());
        if (OptUser.isPresent()) {
            throw new EntityAlreadyPresentException("a player with this nickname already exists");
        }
        return playerRepository.save(player);
    }

    @Override
    public Player updatePlayer(int id, Player updatedPlayer) throws EntityNotFoundException {
        var p = playerRepository.findById(id).orElseThrow(()
                -> new EntityNotFoundException("not found a player on id: " + id));
        p.setName(updatedPlayer.getName());
        p.setLastname(updatedPlayer.getLastname());
        p.setNickname(updatedPlayer.getNickname());
        p.setPassword(updatedPlayer.getPassword());
        return playerRepository.save(p);
    }

    @Override
    public void deletePlayer(int id) throws EntityNotFoundException {
        var p = playerRepository.findById(id).orElseThrow(()
                -> new EntityNotFoundException("not found a player on id: " + id));
        List<PlayerMatch> list = playerMatchRepository.findAllByPlayer(p);
        list.forEach(elem -> playerMatchRepository.delete(elem));
        playerRepository.deleteById(id);
    }

    @Override
    public List<Game> findAllGames() {
        return gameRepository.findAll();
    }

    @Override
    public Game addGame(Game game) throws EntityAlreadyPresentException {
        var optGame = gameRepository.findByName(game.getName());
        if (optGame.isPresent()) {
            throw new EntityAlreadyPresentException("a game with this name already exists");
        }
        return gameRepository.save(game);
    }

    @Override
    public List<MatchDto> findAllMatches() {
        return matchRepository.findAll().stream().map(MatchDto::fromMatch).collect(Collectors.toList());
    }

    @Override
    public Match addMatch(Match match) {
        return matchRepository.save(match);
    }

    @Override
    public List<PlayerMatch> findAllPlayerMatches() {
        return playerMatchRepository.findAll();
    }

    @Override
    public PlayerMatch addPlayerMatch(PlayerMatch playerMatch) {
        return playerMatchRepository.save(playerMatch);
    }

    @Override
    public int countPlayerMatchByPlayer(int id) throws EntityNotFoundException {
        Player player = playerRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("not found player on id:" + id));
        return playerMatchRepository.countByPlayer(player);
    }

    @Override
    public int countPlayerMatchWon(int id) throws EntityNotFoundException {
        Player player = playerRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("not found player on id:" + id));
        return playerMatchRepository.countByPlayerAndHasWon(player, true);
    }

    @Override
    public int countPlayerMatchByGame(int playerId, int gameId) throws EntityNotFoundException {
        playerRepository.findById(playerId).orElseThrow(() ->
                new EntityNotFoundException("not found player on id: " + playerId));
        gameRepository.findById(gameId).orElseThrow(() ->
               new EntityNotFoundException("not found game on id: " + gameId));
        return playerMatchRepository.countByPlayerAndGame(playerId, gameId);
    }

    @Override
    public int countPlayerMatchByGameAndHasWon(int playerId, int gameId) throws EntityNotFoundException {
        playerRepository.findById(playerId).orElseThrow(() ->
                new EntityNotFoundException("not found player on id: " + playerId));
        gameRepository.findById(gameId).orElseThrow(() ->
                new EntityNotFoundException("not found game on id: " + gameId));
        return playerMatchRepository.countByPlayerAndGameAndHasWon(playerId, gameId);
    }

    @Override
    public List<RoundDto> findAllRounds() {
        return roundRepository.findAll().stream().map(RoundDto::fromRound).collect(Collectors.toList());
    }

    @Override
    public Round addRound(Round round) throws EntityNotFoundException {
        playerRepository.findById(round.getPlayer().getId()).orElseThrow(() ->
                new EntityNotFoundException("not found player on id: " + round.getPlayer().getId()));
        matchRepository.findById(round.getMatch().getId()).orElseThrow(() ->
                new EntityNotFoundException("not found match on id: " + round.getMatch().getId()));
        return roundRepository.save(round);
    }

    @Override
    public List<GameResultsStructure> findAllGameResultsStructure() {
        return gameResultStructureRepository.findAll();
    }

    @Override
    public GameResultsStructure addGameResultsStructure(GameResultsStructure gameResultsStructure) {
        return gameResultStructureRepository.save(gameResultsStructure);
    }

    @Override
    public List<GameResultsStructure> findGameResultsStructureByGame(int gameId) throws EntityNotFoundException {
        var game = gameRepository.findById(gameId).orElseThrow(() ->
                new EntityNotFoundException("not found game on id: " + gameId));
        return gameResultStructureRepository.findByGame(game);
    }
}
