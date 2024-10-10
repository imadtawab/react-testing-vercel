import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { clientAPI } from '../../API/axios-global'

export const checkPromoCode = createAsyncThunk("checkPromoCode" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return clientAPI.post("/coupons/check",body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
const initState = {
    isLoading: false,
  }
const client_couponSlice = createSlice({
    name: "client_coupon",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // New Coupon
      .addCase(checkPromoCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkPromoCode.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(checkPromoCode.rejected, (state, action) => {
        state.isLoading = false;
      })
    },
})

// export const counterActions = accountSlice.actions
export default client_couponSlice.reducer