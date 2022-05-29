import { createSlice } from "@reduxjs/toolkit";

const initialmatchState = {
    match: {
        id: 0,
        gameId: 0,
        date: ''
}};

const matchSlice = createSlice({
    name: 'match',
    initialState: initialmatchState,
    reducers: {
        setMatch(state, action) { 
            state.match = action.payload;
        },
        resetMatch(state) { 
            state.match = {id: 0, gameId: 0, date: ''};
        },
    },
});

export const matchActions = matchSlice.actions;

export default matchSlice.reducer;