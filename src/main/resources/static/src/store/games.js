import { createSlice } from "@reduxjs/toolkit";

const initialGamesState = { games: [], currentGame: {id: 0, name: ''} };

const gamesSlice = createSlice({
    name: 'games',
    initialState: initialGamesState,
    reducers: {
        loadGames(state, action) { 
            state.games = action.payload;
        },
        addGame(state, action) {
            state.games.push(action.payload);
        },
        setGame(state, action) { 
            state.currentGame = action.payload;
        },
    },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;