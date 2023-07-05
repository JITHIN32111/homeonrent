
import { createSlice } from '@reduxjs/toolkit'

const propertyInitialState = {
    details: null
}

export const propertySlice = createSlice({
    name: 'property', // changed the name to "property"
    initialState: propertyInitialState,
    reducers: {
        houseDetails(state, action) {
            state.details = action.payload
        },   
        clearDetails(state) {
            state.details = null
            localStorage.clear()
        }
    },
})

export const {houseDetails,clearDetails } = propertySlice.actions

export default propertySlice.reducer