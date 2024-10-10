import { createSlice } from "@reduxjs/toolkit"

const initState = {
    active: false,
}
const sideCartReducer = ( state = initState , action ) => {
	// Logic
    if( action.type === "sideCart/show" ) {
        return {
            active: action.payload,
        }
    }
    return state
}
const sideCartSlice = createSlice({
    name: "sideCart",
    initialState: initState,
    reducers: {
        show: sideCartReducer,
    },
})
export const sideCartActions = sideCartSlice.actions
export default sideCartSlice.reducer