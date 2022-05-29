import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { roundActions } from "../store/rounds";
import { Link } from "react-router-dom";
import { matchActions } from "../store/match";
import { playersActions } from "../store/palyers";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import axios from "axios";
import "./Gioco24.css"

const MATCHES_ENDPOINT = "http://localhost:8080/match";
const PLAYER_MATCH_ENDPOINT = "http://localhost:8080/player-matches";
const ROUND_ENDPOINT = "http://localhost:8080/round";

const Gioco24 = () => {
    
    const players = useSelector(state => state.players.players);
    const rounds = useSelector(state => state.rounds.rounds);
    const match = useSelector(state => state.match.match);
    const dispatch = useDispatch();
    const [roundsNumber, setRoundsNumber] = useState([1]);
    const [show, setShow] = useState(false);
    const [winnerMatch, setWinnerMatch] = useState({});

    useEffect(() => { 
        players.forEach(player => {
            const initialRound = {
                playerId: player.id,
                matchId: match.id,
                roundNumber: 0,
                score: 24
            }
            dispatch(roundActions.playRound(initialRound));
        });
    }, [])


    const setLifePoints = (e) => {
        const newRound = {
            playerId: e.target.dataset.player,
            matchId: match.id,
            roundNumber: roundsNumber[roundsNumber.length-1],
            score: e.target.value
        }
        dispatch(roundActions.editRound(newRound));
        axios.post(ROUND_ENDPOINT, newRound);
        e.target.value = '';
    }

    const restartGame = () => {
        setShow(false);
        players.forEach(player => {
            const initialRound = {
                playerId: player.id,
                matchId: match.id,
                roundNumber: 0,
                score: 24
            }
            dispatch(roundActions.editRound(initialRound));
        })
        setWinnerMatch({});
    }
    
    const endMatch = () => {
        const winner = rounds.filter(elem => elem.score != 0);
        const winnerId = winner[0].playerId;
        const filteredWinner = arrayUnique(winner);
        let end = false;
        filteredWinner.forEach(elem => {
            if (elem.playerId != winnerId) {
                alert(`c'è più di un giocatore in vita`);
                end = true;
                return;
            }
        })
        if (end) { 
            return;
        }
        setShow(true);
        const winnerPlayer = players.find(player => player.id == filteredWinner[0].playerId);
        setWinnerMatch(winnerPlayer);
        players.forEach(player => { 
            const playerMatchToSend = {
                matchId: match.id,
                playerId: player.id,
                hasWon: player.id == winnerPlayer.id,
                score: player.id == winnerPlayer.id ? filteredWinner[0].score : 0
            };
            axios.post(PLAYER_MATCH_ENDPOINT, playerMatchToSend);
        })
    }

    const reset = () => {
        dispatch(matchActions.resetMatch());
        dispatch(playersActions.resetPlayers());
        dispatch(roundActions.resetRounds());
        setWinnerMatch({});
        setShow(false);
    }

    const serializeArr = arr => {
        return arr.map(obj => { return JSON.stringify(obj); });
    };

    const arrayUnique = arr => {
        let objects = serializeArr(arr);
        let unique = [...new Set(objects)];
        return unique.map(str => { return JSON.parse(str); } );
    };

    

    return (
        <div className="wrapper-24">
            <h1>24</h1>
            <div className="buttons-panel">
                <button className="btn btn-outline-primary button" onClick={endMatch}>termina partita</button>
                <button className="btn btn-outline-primary button" onClick={restartGame}>interrompi e rincomincia partita</button>
                <Link to='/'><button className="btn btn-outline-success button" onClick={reset}>home</button></Link>
            </div>
            <table align="center">
                <thead>
                    <tr>
                        {players.map(elem => {
                            return <th key={elem.id}>{elem.nickname}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {players.map(elem => {
                            return (
                                <td key={elem.id}>
                                    {rounds.filter(round => round.playerId == elem.id)[0] ? 
                                    rounds.filter(round => round.playerId == elem.id)[0].score : null
                                    }
                                </td>
                            );
                        })}
                    </tr>
                    <tr>
                        {players.map(elem => {
                            return <td key={elem.id}><input type="number" onBlur={setLifePoints} data-player={elem.id} /></td>
                        })}
                    </tr>
                </tbody>
            </table>
            <Modal show={show}>
                <ModalHeader>
                    <ModalTitle>Vincitore</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div>
                        {winnerMatch.nickname}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-outline-primary button" onClick={restartGame}>gioca di nuovo</button>
                    <Link to='/'><button className="btn btn-outline-success button" onClick={reset}>home</button></Link>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default Gioco24;