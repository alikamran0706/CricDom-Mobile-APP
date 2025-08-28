import { createSlice } from '@reduxjs/toolkit';

interface PlayerState {
    players: any[];
    currentPlayer: null | any;
}

const initialState: PlayerState = {
    players: [],
    currentPlayer: null,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
       
    },
});

export default playerSlice.reducer;