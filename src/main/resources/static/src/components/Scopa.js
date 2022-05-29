import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { roundActions } from "../store/rounds";
import { matchActions } from "../store/match";
import { playersActions } from "../store/palyers";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "./Scopa.css"

const MATCHES_ENDPOINT = "http://localhost:8080/match";
const PLAYER_MATCH_ENDPOINT = "http://localhost:8080/player-matches";
const ROUND_ENDPOINT = "http://localhost:8080/round";

const Scopa = () => { 

    const players = useSelector(state => state.players.players);
    const rounds = useSelector(state => state.rounds.rounds);
    const match = useSelector(state => state.match.match);
    const dispatch = useDispatch();
    const [moves, setMoves] = useState([]);
    const [roundsNumber, setRoundsNumber] = useState([1]);
    const currentGame = useSelector(state => state.games.currentGame);
    const [show, setShow] = useState(false);
    const [bestScore, setBestScore] = useState(0);

    const addRound = (e) => { 
        let newMoves = {
            playerId: e.target.dataset.player,
            matchId: match.id,
            roundNumber: roundsNumber[roundsNumber.length-1],
            score: e.target.value
        };
        setMoves(moves.concat(newMoves));
        //fare richiesta axios per addare round
    }

    const endRound = () => {
        moves.forEach(move => {
            dispatch(roundActions.playRound(move));
            axios.post(ROUND_ENDPOINT, move);
        });
        setMoves([]);
        setRoundsNumber(roundsNumber.concat(roundsNumber[roundsNumber.length - 1] + 1));
        [...document.getElementsByClassName('add-points')].forEach(elem => elem.value = '');
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
    
    const restartGame = () => {
        setShow(false);
        setMoves([]);
        setRoundsNumber([1]);
        dispatch(roundActions.resetRounds());
        const newMatch = {
            gameId: currentGame.id,
            date: dateFormatter(new Date())
        }
        axios.post(MATCHES_ENDPOINT, newMatch)
            .then(res => {
                dispatch(matchActions.setMatch(res.data));
            });
    }
    
    const reset = () => {
        setRoundsNumber([1]);
        setMoves([]);
        setShow(false);
        setBestScore(0);
        dispatch(matchActions.resetMatch());
        dispatch(playersActions.resetPlayers());
        dispatch(roundActions.resetRounds());
    }

    const dateFormatter = (date) => { 
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${date.getFullYear()}-${month}-${date.getDate()}T${hours}:${minutes}:${seconds}`
    }

    return (
        <div className="scopa-wrapper">
            <h1>Scopa</h1>
            <div className="buttons-panel">
                <button className="btn btn-outline-primary button" onClick={endMatch}>termina partita</button>
                <button className="btn btn-outline-primary button" onClick={restartGame}>interrompi e rincomincia partita</button>
                <Link to='/'><button className="btn btn-outline-success button" onClick={reset}>home</button></Link>
                <table align="center">
                    <thead>
                        <tr>
                            <th>rounds</th>
                            {players.map(elem => {
                                return <th key={elem.id}>{elem.nickname}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {roundsNumber.map((element, index) => { 
                            return (
                                index === roundsNumber.length - 1 ? null : 
                                <tr key={element}>
                                    <td>{element}</td>
                                    {players.map(player => {
                                        return (
                                            <td key={player.id}>
                                                {rounds.filter(elem => elem.playerId == player.id && elem.roundNumber == element)[0] ? 
                                                rounds.filter(elem => elem.playerId == player.id && elem.roundNumber == element)[0].score : <span>ciao</span>}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        <tr>
                            <td>round in corso</td>
                            {players.map(player => {
                                return (
                                    <td key={player.id}><input type="number" className="add-points" data-player={player.id} onBlur={addRound} /></td>       
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
                <div className="end-round">
                    <button className="btn btn-sm btn-primary float-right" onClick={endRound}>termina round</button>
                </div>
            </div>
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
        </div>
    );
}

export default Scopa;