import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from "../API/axios-global"




const initState = {
    showModal: false,
    nextFunc: null,
    modalInfo: {
        title: "Validation of the operation",
        message: "You want to validate your opearation ?",
        type: "info",
        path: false,
        closeX: false
      }
}
const modalReducer = ( state = initState , action ) => {
	// Logic
    if( action.type === "modal/show" ) {
        return {
            ...state ,
            showModal: action.payload.showModal,
            nextFunc: action.payload.nextFunc || null,
            modalInfo: {
                title: action.payload.modalInfo.title || "Validation of the operation",
                message: action.payload.modalInfo.message || "You want to validate your opearation ?",
                type: action.payload.modalInfo.type || "info",
                path: action.payload.modalInfo.path || false,
                closeX: action.payload.modalInfo.closeX || false
              }
        }
    }
    return state
}

// const stores = legacy_createStore(modal) ;
const modalSlice = createSlice({
    name: "modal",
    initialState: initState,
    reducers: {
        show: modalReducer
    },

})


export const modalActions = modalSlice.actions
export default modalSlice.reducer
