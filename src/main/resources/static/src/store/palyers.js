import { createSlice } from "@reduxjs/toolkit";

const initialPlayersState = {players: []};

const playersSlice = createSlice({
    name: 'players',
    initialState: initialPlayersState,
    reducers: {
        addPlayer(state, action) { 
            state.players.push(action.payload);
        },
        removePlayer(state, action) {
            state.players = state.players.filter(elem => elem.nickname !== action.payload);
        },
        resetPlayers(state) { 
            state.players = [];
        },
    }
});

export const playersActions = playersSlice.actions;

export default playersSlice.reducer;