import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { clientAPI } from '../../API/axios-global'

export const getAttributes = createAsyncThunk("getAttributes",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return clientAPI.get("/attributes").then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})

const initState = {
    isLoading: false,
    isLoadingPage: false,
}
const client_attributeSlice = createSlice({
    name: "client_attribute",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // GET Attributes
      .addCase(getAttributes.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getAttributes.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getAttributes.rejected, (state, action) => {
        state.isLoadingPage = false;
      })
    },
})
export default client_attributeSlice.reducer