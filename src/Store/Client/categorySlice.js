import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { clientAPI } from '../../API/axios-global'

export const getCategories = createAsyncThunk("getCategories",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return clientAPI.get("/categories").then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})

const initState = {
    isLoading: false,
    isLoadingPage: false,
}
const client_categorySlice = createSlice({
    name: "client_category",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // GET Categories
      .addCase(getCategories.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoadingPage = false;
      })
    },
})
export default client_categorySlice.reducer