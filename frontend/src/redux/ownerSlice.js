import { createSlice } from '@reduxjs/toolkit';

const ownerInitialState = {
    details: null
};

export const ownerSlice = createSlice({
    name: 'owner',
    initialState: ownerInitialState,
    reducers: {
        sellerDetails(state, action) {
            state.details = action.payload;
        },
        clearOwnerDetails(state) {
            state.details = null;
            localStorage.clear();
        }
    },
});

export const {sellerDetails, clearOwnerDetails } = ownerSlice.actions;

export default ownerSlice.reducer;
