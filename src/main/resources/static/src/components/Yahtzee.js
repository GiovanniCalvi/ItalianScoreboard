import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchActions } from "../store/match";
import { roundActions } from "../store/rounds";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Link } from "react-router-dom";
import { playersActions } from "../store/palyers";
import "./Yahtzee.css"

const GAME_RESULTS_STRUCTURE_ENDPOINT = "http://localhost:8080/game-results-structure";
const MATCHES_ENDPOINT = "http://localhost:8080/match";
const PLAYER_MATCH_ENDPOINT = "http://localhost:8080/player-matches";
const ROUND_ENDPOINT = "http://localhost:8080/round";

const Yahtzee = () => {

    const players = useSelector(state => state.players.players);
    const currentGame = useSelector(state => state.games.currentGame);
    const match = useSelector(state => state.match.match);
    const rounds = useSelector(state => state.rounds.rounds)
    const dispatch = useDispatch();
    const [gameStructure, setGameStructure] = useState([]);
    const [thisRound, setThisRound] = useState(0);
    const [countPlayers, setCountPlayers] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [show, setShow] = useState(false);
    const [dice, setDice] = useState([]);
    const [showDice, setShowDice] = useState(false);
    const [countRoll, setCountRoll] = useState(0);

    useEffect(() => {
        if (currentGame.id !== 0) {
            axios.get(GAME_RESULTS_STRUCTURE_ENDPOINT + "/" + currentGame.id)
                .then(res => {
                    setGameStructure(res.data);
                });
        }
    }, [currentGame]);

    const addPoint = (e) => {
        if (e.target.value == '') {
            return;
        }
        const roundToAdd = {
            playerId: e.target.dataset.player,
            matchId: match.id,
            roundNumber: thisRound,
            score: e.target.value
        }
        dispatch(roundActions.playRound(roundToAdd));
        let newCountPlayers = countPlayers + 1;
        setCountPlayers(newCountPlayers);
        if (newCountPlayers === players.length) { 
            setThisRound(thisRound + 1);
            setCountPlayers(1);
        }
        axios.post(ROUND_ENDPOINT, roundToAdd);
    }

    const endMatch = () => {
        let actualBestScore = 0;
        const playersMatch = players.map(player => {
            let totalPlayerScore = rounds.filter(round => round.playerId == player.id).map(item => parseInt(item.score)).reduce((a, b) => a + b, 0);
            if (totalPlayerScore > actualBestScore) { 
                actualBestScore = totalPlayerScore;
            }
            return { ...player, totalScore: totalPlayerScore }
        });
        playersMatch.forEach(playerMatch => {
            const playerMatchToSend = {
                matchId: match.id,
                playerId: playerMatch.id,
                hasWon: playerMatch.totalScore === actualBestScore,
                score: playerMatch.totalScore
            }
            axios.post(PLAYER_MATCH_ENDPOINT, playerMatchToSend);
            playerMatchToSend.hasWon && setBestScore(playerMatchToSend.score);
        });
        setShow(true);
    }

    const reset = () => {
        dispatch(matchActions.resetMatch());
        dispatch(playersActions.resetPlayers());
        dispatch(roundActions.resetRounds());
        setGameStructure([]);
        setThisRound(0);
        setCountPlayers(0);
        setBestScore(0);
        setShow(false);
    }

    const restartGame = () => {
        dispatch(roundActions.resetRounds());
        [...document.getElementsByTagName('input')].forEach(elem => elem.value = '');
        setThisRound(0);
        setCountPlayers(1);
        const newMatch = {
            gameId: currentGame.id,
            date: dateFormatter(new Date())
        }
        axios.post(MATCHES_ENDPOINT, newMatch)
            .then(res => { 
                dispatch(matchActions.setMatch(res.data));
            })
    }

    const dateFormatter = (date) => { 
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${date.getFullYear()}-${month}-${date.getDate()}T${hours}:${minutes}:${seconds}`
    }

    const rollDice = () => {
        let results = [];
        for (let i = 0; i < 5; i++) {
            results.push(Math.round(Math.random() * 5 + 1));
        }
        setDice(results.map((elem, index) => { return {id: index + 'f', num: elem, toKeep: false }}));
        setShowDice(true);
        setCountRoll(1);
    }

    const keepDice = (e) => {
        let n = dice.filter(elem => elem.id == e.target.dataset.id)[0];
        n.toKeep = !n.toKeep;
        setDice(dice.filter(elem => elem.id != e.target.dataset.id).concat(n).sort(elem => elem.toKeep).sort((a, b) => a.toKeep - b.toKeep));
    }

    const reRollDice = () => {
        let temp = dice.filter(elem => elem.toKeep);
        let laps = temp.length;
        for (let i = 0; i < 5 - laps; i++) {
            temp.push({id: i + 's', num: Math.round(Math.random() * 5 + 1), toKeep: false });
        }
        setDice(temp.sort((a, b) => a.toKeep - b.toKeep));
        setCountRoll(countRoll + 1);
    }

    return (
        <div className="yahtzee-wrapper">
            <h1>Yahtzee</h1>
            <div className="buttons-panel">
                <button className="btn btn-outline-primary button" onClick={rollDice}>lancia i dadi</button>
                <button className="btn btn-outline-primary button" onClick={endMatch}>termina partita</button>
                <button className="btn btn-outline-primary button" onClick={restartGame}>interrompi e rincomincia partita</button>
                <Link to='/'><button className="btn btn-outline-success button" onClick={reset}>home</button></Link>
            </div>
            <table align="center">
                <thead>
                    <tr>
                        <th>mosse</th>
                        {players.map(elem => { 
                            return <th key={elem.id}>{elem.nickname}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {gameStructure.sort((a, b) => a.rowNumber - b.rowNumber).map((elem, index) => { 
                        return (
                            <tr key={index}>
                                <td>{elem.rowName}</td>
                                {players.map(player => { 
                                    return (
                                        <td key={player.id}>
                                            {
                                                index != 14 ?
                                                <input type='number' data-player={player.id} onBlur={addPoint} /> :
                                                rounds.filter(round => round.playerId == player.id).map(item => parseInt(item.score)).reduce((a, b) => a + b, 0)
                                            }
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal show={show}>
                <ModalHeader>
                    <ModalTitle>Vincitore</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {
                        players.map(player => {
                            if (rounds.filter(round => round.playerId == player.id).map((item) => parseInt(item.score)).reduce((a, b) => a + b, 0) == bestScore) { 
                                return <span key={player.id}>{player.name}</span>
                            }
                        })
                    } ha vinto la partita
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-outline-primary button" onClick={restartGame}>gioca di nuovo</button>
                    <Link to='/'><button className="btn btn-outline-success button" onClick={reset}>home</button></Link>
                </ModalFooter>
            </Modal>
            < Modal show={showDice}>
                <ModalHeader>
                    <ModalTitle>lancio dei dadi</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div>seleziona i dadi che vuoi tenere</div>
                        {dice.map((elem, index) => { 
                            return (
                                <div key={index + 'd'}>
                                    <input type="checkbox" data-id={elem.id} checked={elem.toKeep} onChange={keepDice}/>
                                    <span>{elem.num}</span>
                                </div>
                            );
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-outline-primary button" onClick={reRollDice} disabled={countRoll >= 3}>lancia ancora</button>
                    <button className="btn btn-outline-primary button" onClick={() => setShowDice(false)}>tieni</button>
                    <button className="btn btn-outline-danger button" onClick={() => setShowDice(false)}> close</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Yahtzee;