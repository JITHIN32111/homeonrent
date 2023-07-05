import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    details: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        userDetails(state, action) {
            state.details = action.payload;
        },
        clearUserDetails(state) {
            state.details = null;
            localStorage.clear();
        }
    },
});

export const {userDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
