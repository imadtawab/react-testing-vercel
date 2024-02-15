import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { clientAPI } from "../API/axios-global"
import axios, { formToJSON } from "axios";
import { BsWindowSidebar } from "react-icons/bs";
import ClearStates from "../utils/ClearStates";


export const client_getProducts = createAsyncThunk("client_getProducts",
async ({filter,limit}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    console.log(limit ? limit : "");
    return clientAPI.post(`/products${limit ? "?limit="+limit : ""}` ,filter).then((docs) => {
        return docs.data
    }).catch(err => rejectWithValue(err))

})
export const client_productDetails = createAsyncThunk("client_productDetails",
async (urlKey, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return clientAPI.get("/products/"+urlKey).then((docs) => {
        console.log(docs,8529);
        if(!docs.data.success) return rejectWithValue({message: docs.data.error})
        return docs.data
    }).catch(err => rejectWithValue(err))

})
export const client_getCategories = createAsyncThunk("client_getCategories",
async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return clientAPI.get("/categories").then((docs) => {
        return docs.data
    }).catch(err => rejectWithValue(err))

})
export const client_getAttributes = createAsyncThunk("client_getAttributes",
async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return clientAPI.get("/attributes").then((docs) => {
        return docs.data
    }).catch(err => rejectWithValue(err))

})

// export const clearState = (params) => {
    
// }




const initState = {
    allProducts: [],
    client_getProductsStatus:{isLoading: false , error: false , success: false},
    client_productDetailsStatus:{isLoading: false , error: false , success: false},
    client_getCategories_Status:{isLoading: false , error: false , success: false},
    client_getAttributes_Status:{isLoading: false , error: false , success: false},
    }
//     const clearStatesReducer = (state=initState , action) => {
//         if(action.type === "client_products/states"){
//             console.log(state , "aaaaaaaaaaaa" , action);
//             return initState
//         }
// }
const clearStatesReducer = (state=initState , action) => {
    return ClearStates(state , initState , action)
}
const client_ProductsSlice = createSlice({
    name: "client_products",
    initialState: initState,
    reducers: {
        states: clearStatesReducer
        },
    extraReducers: {
        // GET products
        [client_getProducts.pending]: (state, action) => {
            console.log(action)
            state.client_getProductsStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [client_getProducts.fulfilled]: (state, action) => {
            state.allProducts = action.payload
            state.client_getProductsStatus = {
                ...state.client_getProductsStatus,
                isLoading: false,
                success: true
            }
        },
        [client_getProducts.rejected]: (state, action) => {
            console.log(action)
            state.client_getProductsStatus = {
                ...state.client_getProductsStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
                // GET product details
                [client_productDetails.pending]: (state, action) => {
                    console.log(action)
                    state.client_productDetailsStatus = {
                        isLoading: true,
                        error: false,
                        success: false
                    }
                },
                [client_productDetails.fulfilled]: (state, action) => {
                    console.log(action,321);
                    state.client_productDetailsStatus = {
                        ...state.client_productDetailsStatus,
                        isLoading: false,
                        success: {product: action.payload.product, attributes: action.payload.attributes}
                        // success: action.payload
                    }
                    
                },
                [client_productDetails.rejected]: (state, action) => {
                    console.log(action)
                    state.client_productDetailsStatus = {
                        ...state.client_productDetailsStatus,
                        isLoading: false,
                        error: action.payload.message
                    }
                },
                        // GET products
                        [client_getCategories.pending]: (state, action) => {
                            console.log(action)
                            state.client_getCategories_Status = {
                                isLoading: true,
                                error: false,
                                success: false
                            }
                        },
                        [client_getCategories.fulfilled]: (state, action) => {
                            state.client_getCategories_Status = {
                                ...state.client_getCategories_Status,
                                isLoading: false,
                                success: action.payload
                            }
                        },
                        [client_getCategories.rejected]: (state, action) => {
                            console.log(action)
                            state.client_getCategories_Status = {
                                ...state.client_getCategories_Status,
                                isLoading: false,
                                error: action.payload.message
                            }
                        },
                                                // GET products
        [client_getAttributes.pending]: (state, action) => {
            console.log(action)
            state.client_getAttributes_Status = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [client_getAttributes.fulfilled]: (state, action) => {
            state.client_getAttributes_Status = {
                ...state.client_getAttributes_Status,
                isLoading: false,
                success: action.payload
            }
        },
        [client_getAttributes.rejected]: (state, action) => {
            console.log(action)
            state.client_getAttributes_Status = {
                ...state.client_getAttributes_Status,
                isLoading: false,
                error: action.payload.message
            }
        },
    }
})


export const counterActions = client_ProductsSlice.actions
export default client_ProductsSlice.reducer
