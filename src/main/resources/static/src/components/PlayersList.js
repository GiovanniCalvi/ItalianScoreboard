import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playersActions } from "../store/palyers";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Graph from "./Graph";
import './PlayerList.css'
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PLAYERS_ENDPOINT = "http://localhost:8080/player";
const PLAYER_MATCH_ENDPOINT = "http://localhost:8080/player-matches";

const PlayersList = () => { 
    
    const games = useSelector(state => state.games.games);
    const [playerAlreadyExists, setPlayerAlreadyExists] = useState(false);
    const [allPlayers, setAllPlayers] = useState([]);
    const [wrongPass, setWrongPass] = useState(false);
    const [wrongConfirmPass, setWrongConfirmPass] = useState(false);
    const [show, setShow] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [playerToShow, setPlayerToShow] = useState({});
    const [playerToCreate, setPlayerToCreate] = useState({
        name: '',
        lastname: '',
        nickname: '',
        password: '',
        confirmPassword: ''
    })
    const [matchesPlayed, setMatchesPlayed] = useState(0);
    const [matchesWon, setMatchesWon] = useState(0);
    const [matchesPlayedByGame, setMatchesPlayedByGame] = useState([]);
    const dispatch = useDispatch();
    const players = useSelector(state => state.players.players);
    
    useEffect(() => { 
        axios.get(PLAYERS_ENDPOINT).then((res) => { 
            setAllPlayers(res.data);
        })
    }, []);

    const addPlayerHandler = (e) => {
        e.preventDefault();
        const playerToAdd = allPlayers.filter(elem => elem.nickname === e.target.nickname.value)[0];
        if (e.target.password.value === playerToAdd.password && !players.includes(playerToAdd)) {
            dispatch(playersActions.addPlayer(playerToAdd));
            setWrongPass(false);
        } else { 
            setWrongPass(true);
        }
        e.target.reset();
    };

    const removePlayerHandler = (e) => { 
        dispatch(playersActions.removePlayer(e.target.value));
    }

    const createPlayer = (e) => { 
        e.preventDefault();
        if (playerToCreate.password !== playerToCreate.confirmPassword) {
            setWrongConfirmPass(true);
            return;
        }
        setWrongConfirmPass(false);
        const playerToAdd = {
            name: playerToCreate.name,
            lastname: playerToCreate.lastname,
            nickname: playerToCreate.nickname,
            password: playerToCreate.password
        }
        setShow(false);
        axios.post(PLAYERS_ENDPOINT, playerToAdd)
            .then(res => { 
                let newAllPlayers = allPlayers.concat(res.data);
                setAllPlayers(newAllPlayers);
            });
    }

    const nicknameValidation = (e) => { 
        setPlayerAlreadyExists(false);
        setPlayerToCreate({ name: playerToCreate.name, lastname: playerToCreate.lastname, nickname: e.target.value, password: playerToCreate.password, confirmPassword: playerToCreate.confirmPassword });
        allPlayers.forEach(elem => {
            if (elem.nickname === e.target.value) {
                setPlayerAlreadyExists(true);
            }
        });
    }

    const setPlayer = (e) => {
        const player = {
            id: e.target.value,
            nickname: e.target.dataset.nickname
        }
        
        axios.get(PLAYER_MATCH_ENDPOINT + "/" + player.id)
            .then(res => setMatchesPlayed(res.data)); //match giocati
        axios.get(PLAYER_MATCH_ENDPOINT + "/won/" + player.id)
            .then(res => setMatchesWon(res.data)); //match vinti
        
        let tempArray = [];
        
        games.forEach(game => {
            axios.get(PLAYER_MATCH_ENDPOINT + "/player-" + player.id + "/game-" + game.id)
                .then(res => {
                    axios.get(PLAYER_MATCH_ENDPOINT + "/player-" + player.id + "/game-" + game.id + "/won")
                        .then(res2 => {
                            setMatchesPlayedByGame(tempArray.concat({ game: game.name, played: res.data, won: res2.data }));
                            tempArray.push({ game: game.name, played: res.data, won: res2.data });
                        });
                })
        });
        setShowStats(true);
        setPlayerToShow(player);
    }

    const deletePlayer = () => { 
        axios.delete(PLAYERS_ENDPOINT + "/" + playerToShow.id);
        dispatch(playersActions.removePlayer(playerToShow.nickname));
        const newAllPlayers = allPlayers.filter(player => player.nickname !== playerToShow.nickname);
        setAllPlayers(newAllPlayers);
        closeStats();
    }

    const closeStats = () => {
        setPlayerToShow({});
        setShowStats(false);
    }

    return (
        <div className="player-list-wrapper">
            <div>
                <h3 className="mb-3">scegli i giocatori</h3>
            </div>
            <div>
                {players.map(elem => {
                    return (
                        <div className="row" key={elem.id}>
                            <div className="col-sm-4"></div>
                            <div className="col-sm-2 mb-2">{elem.nickname}</div>
                            <div className="col-sm-1 mb-2" type="button"><button className="btn btn-sm btn-outline-danger button" value={elem.nickname} onClick={removePlayerHandler}><FontAwesomeIcon icon={faTrash}/></button></div>
                            <div className="col-sm-1 mb-2"><button className="btn btn-sm btn-outline-primary button" value={elem.id} data-nickname={elem.nickname} onClick={setPlayer}>statistiche</button></div> 
                            <div className="col-sm-4"></div>
                        </div>
                    );
                })}
            </div>
            <div className="form-wrapper">
                <form className="input-group" onSubmit={addPlayerHandler}>
                    <select className="form-control" name="nickname">
                        <option>seleziona un giocatore</option>
                        {allPlayers.map(elem => {
                            return <option key={elem.id ? elem.id : 0} value={elem.nickname}>{elem.nickname}</option>
                        })}
                    </select>
                    <input className="form-control" name="password" type="password" placeholder="password" />
                    <button className="btn btn-sm btn-primary" type="submit"><FontAwesomeIcon icon={faPlus}/></button>
                </form>
                {wrongPass && <div className="wrong-pass">password errata</div>}
                <button className="btn btn-outline-primary button m-4" onClick={() => setShow(true)}>crea nuovo giocatore</button>
            </div>
            <Modal show={show}>
                <ModalHeader>
                    <ModalTitle>Crea un nuovo giocatore</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form className="add-player" onSubmit={createPlayer}>
                        <div><input placeholder="nome" value={playerToCreate.name} onChange={(e) => setPlayerToCreate({name: e.target.value, lastname: playerToCreate.lastname, nickname: playerToCreate.nickname, password: playerToCreate.password, confirmPassword: playerToCreate.confirmPassword})}/></div>
                        <div><input placeholder="cognome" value={playerToCreate.lastname} onChange={(e) => setPlayerToCreate({name: playerToCreate.name, lastname: e.target.value, nickname: playerToCreate.nickname, password: playerToCreate.password, confirmPassword: playerToCreate.confirmPassword})}/></div>
                        <div> <input placeholder="nickname" value={playerToCreate.nickname} onChange={nicknameValidation}/></div>
                        {playerAlreadyExists && <span className="wrong-pass">esiste già un giocatore con questo nickname</span>}
                        <div><input type="password" placeholder="password" value={playerToCreate.password} onChange={(e) => setPlayerToCreate({ name: playerToCreate.name, lastname: playerToCreate.lastname, nickname: playerToCreate.nickname, password: e.target.value, confirmPassword: playerToCreate.confirmPassword })} /></div>
                        <div> <input type="password" placeholder="conferma password" value={playerToCreate.confirmPassword} onChange={(e) => setPlayerToCreate({ name: playerToCreate.name, lastname: playerToCreate.lastname, nickname: playerToCreate.nickname, password: playerToCreate.password, confirmPassword: e.target.value })} /></div>
                        {wrongConfirmPass && <div className="wrong-pass">le due password non corrisondono</div>}
                        <button className="btn btn-outline-primary button" type="submit" disabled={playerAlreadyExists && true}>crea giocatore</button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setShow(false)}>chiudi</button>
                </ModalFooter>
            </Modal>
            <Modal show={showStats}>
                <ModalHeader>
                    <ModalTitle> <h3>vinte da {playerToShow.nickname}</h3></ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 left-col">
                                match totali: {matchesWon} / {matchesPlayed} 
                            </div>
                            <div className="col-sm-6">
                                <Graph win={matchesWon} lose={matchesPlayed - matchesWon}/>
                            </div>
                        </div>
                        <div>
                            {matchesPlayedByGame.map((elem, index) => {
                                return (
                                    <div className="row" key={index + 's'}>
                                        {elem.played > 0 ? <>
                                            <div className="col-sm-6 left-col">
                                                {elem.game}: {elem.won}/{elem.played}
                                            </div>
                                            <div className="col-sm-6">
                                                <Graph win={elem.won} lose={elem.played - elem.won} />
                                            </div></> : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-sm btn-danger" onClick={deletePlayer}>elimina giocatore</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={closeStats}>chiudi</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PlayersList;