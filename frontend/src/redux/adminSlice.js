import { createSlice } from '@reduxjs/toolkit';

const adminInitialState = {
    details: null
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState: adminInitialState,
    reducers: {
        adminDetails(state, action) {
            state.details = action.payload;
        },
        clearAdminDetails(state) {
            state.details = null;
            localStorage.clear();
        }
    },
});

export const {adminDetails, clearAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;
