import { configureStore } from "@reduxjs/toolkit";

import gamesReducer from './games'
import playersReducer from './palyers'
import roundsReducer from './rounds'
import matchReducer from './match'

const store = configureStore({
    reducer: {games: gamesReducer, players: playersReducer, rounds: roundsReducer, match: matchReducer},
});

export default store;