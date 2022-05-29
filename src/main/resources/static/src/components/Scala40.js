import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roundActions } from "../store/rounds";
import './Scala40.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { matchActions } from "../store/match";
import { playersActions } from "../store/palyers";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const MATCHES_ENDPOINT = "http://localhost:8080/match";
const PLAYER_MATCH_ENDPOINT = "http://localhost:8080/player-matches";
const ROUND_ENDPOINT = "http://localhost:8080/round";

const Scala40 = () => { 

    const players = useSelector(state => state.players.players);
    const rounds = useSelector(state => state.rounds.rounds);
    const match = useSelector(state => state.match.match);
    const dispatch = useDispatch();
    const [moves, setMoves] = useState([]);
    const [roundsNumber, setRoundsNumber] = useState([1]);
    const currentGame = useSelector(state => state.games.currentGame);
    const [show, setShow] = useState(false);

    const addRound = (e) => {
        let newMoves = {
            playerId: e.target.dataset.player,
            matchId: match.id,
            roundNumber: roundsNumber[roundsNumber.length-1],
            score: e.target.value
        };
        setMoves(moves.concat(newMoves));
        //fare richiesta axios per addare il round
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
        dispatch(matchActions.resetMatch());
        dispatch(playersActions.resetPlayers());
        dispatch(roundActions.resetRounds());
    }

    const endMatch = () => { 
        setShow(true);
    }

    const sendWinner = (e) => {
        e.preventDefault();
        const winner = players.filter(player => player.nickname === e.target.winner.value)[0];
        if (!winner) {
            alert("il nickname inserito non è valido");
            return;
        }
        players.forEach(player => { 
            const playerMatchToSend = {
                matchId: match.id,
                playerId: player.id,
                hasWon: player == winner,
                score: player == winner ? 100 : 0
            }
            axios.post(PLAYER_MATCH_ENDPOINT, playerMatchToSend);
        })
        setShow(false);
        dispatch(roundActions.resetRounds());
        const newMatch = {
            gameId: currentGame.id,
            date: dateFormatter(new Date())
        };
        axios.post(MATCHES_ENDPOINT, newMatch)
            .then(res => {
                dispatch(matchActions.setMatch(res.data));
            });
        setRoundsNumber([1]);
        setMoves([]);
    }

    const dateFormatter = (date) => { 
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${date.getFullYear()}-${month}-${date.getDate()}T${hours}:${minutes}:${seconds}`
    }

    return (
        <div className="scala40-wrapper">
            <h1>SCALA 40</h1>
            <div className="buttons-panel">
                <button className="btn btn-outline-primary button" onClick={endMatch}>termina partita</button>
                <button className="btn btn-outline-primary button" onClick={restartGame}>interrompi e rincomincia partita</button>
                <Link to='/'><button className="btn btn-outline-success button" onClick={reset}>home</button></Link>
            </div>
            <table id="scala40-table" align="center">
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
            <Modal show={show}>
                <ModalHeader>
                    <ModalTitle>Vincitore</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form className="select-winner" onSubmit={sendWinner}>
                        <label htmlFor="winner">inserisci il nome del vincitore</label>
                        <div><input id="winner" name="winner"></input></div>
                        <button className="btn btn-outline-primary button" type='submit'>conferma</button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-outline-primary button" onClick={restartGame}>gioca di nuovo</button>
                    <Link to='/'><button className="btn btn-outline-success button" onClick={reset}>home</button></Link>
                    <button className="btn btn-outline-danger" onClick={() => setShow(false)}> close</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Scala40;