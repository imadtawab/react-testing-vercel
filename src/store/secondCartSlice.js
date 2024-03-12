import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from "../API/axios-global"
import ClearStates from "../utils/ClearStates"




const initState = {
    showCart: false,
}
const cartReducer = ( state = initState , action ) => {
	// Logic
    if( action.type === "cart/show" ) {
        return {
            showCart: action.payload,
        }
    }
    return state
}
const clearStatesReducer = (state=initState , action) => {
    return ClearStates(state , initState , action)
}
const cartSlice = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        show: cartReducer,
        states: clearStatesReducer
    },

})


export const cartActions = cartSlice.actions
export default cartSlice.reducer
