import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { clientAPI } from '../../API/axios-global'

  export const getShippingMethods = createAsyncThunk("getShippingMethods",
    async (_, thunkAPI) => {
      const {rejectWithValue} = thunkAPI
      return clientAPI.get("/shipping-methods").then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
  })

const initState = {
    isLoading: false,
}
const client_shippingMethodsSlice = createSlice({
    name: "client_shippingMethods",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // GET ShippingMethods
      .addCase(getShippingMethods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShippingMethods.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getShippingMethods.rejected, (state, action) => {
        state.isLoading = false;
      })
    },
})

// export const counterActions = accountSlice.actions
export default client_shippingMethodsSlice.reducer