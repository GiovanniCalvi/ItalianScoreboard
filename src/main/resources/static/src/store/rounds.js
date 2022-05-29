import { createSlice } from "@reduxjs/toolkit";

const initialRoundsState = { rounds: [] };

const roundsSlice = createSlice({
    name: 'rounds',
    initialState: initialRoundsState,
    reducers: {
        playRound(state, action) {
            state.rounds.push(action.payload);
        },
        resetRounds(state) { 
            state.rounds = [];
        },
        editRound(state, action) {
            let newState = [];
            for (let round of state.rounds) {
                if (round.playerId != action.payload.playerId) {
                    newState.push(round);
                } else {
                    newState.push({
                        playerId: action.payload.playerId,
                        matchId: action.payload.matchId,
                        roundNumber: action.payload.roundNumber,
                        score: action.payload.score
                    })
                }
            }
            state.rounds = newState;
        },
    },
});

export const roundActions = roundsSlice.actions;

export default roundsSlice.reducer;