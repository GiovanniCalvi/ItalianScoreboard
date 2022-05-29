import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { gamesActions } from "../store/games";
import { matchActions } from "../store/match";
import "./GameList.css"

const GAMES_ENDPOINT = "http://localhost:8080/game";
const MATCHES_ENDPOINT = "http://localhost:8080/match"

const GameList = () => { 

    const games = useSelector(state => state.games.games);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(GAMES_ENDPOINT).then((res) => { 
            dispatch(gamesActions.loadGames(res.data));
        });
    }, []);

    const startMatch = (e) => {
        const matchToSend = {
            gameId: e.target.value,
            date: dateFormatter(new Date())
        }
        dispatch(gamesActions.setGame({id: e.target.value, name: e.target.dataset.name}))
        axios.post(MATCHES_ENDPOINT, matchToSend)
            .then(res => { 
                dispatch(matchActions.setMatch(res.data));
            });
    };

    const dateFormatter = (date) => { 
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${date.getFullYear()}-${month}-${date.getDate()}T${hours}:${minutes}:${seconds}`
    }

    return (
        <div className="game-list-wrapper">
            <div>
                <h3>scegli un gioco</h3>
            </div>
            <div>
                {games.map(elem => {
                    return <div key={elem.id}>
                        <Link to={elem.name}>
                        <button className="button-games" data-name={elem.name} value={elem.id} onClick={startMatch}>{elem.name}</button>
                        </Link>
                    </div>
                })}
            </div>
        </div>
    );
}

export default GameList;