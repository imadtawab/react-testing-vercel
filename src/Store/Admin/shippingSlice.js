import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from '../../API/axios-global'

export const newShippingMethod = createAsyncThunk("newShippingMethod" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/shipping-methods/new",body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
  export const getShippingMethods = createAsyncThunk("getShippingMethods",
    async (_, thunkAPI) => {
      const {rejectWithValue} = thunkAPI
      return adminAPI.get("/shipping-methods").then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
  })
  export const changeVisibility = createAsyncThunk("changeVisibility",
    async ({_id, publish}, thunkAPI) => {
      const {rejectWithValue} = thunkAPI
      return adminAPI.patch("/shipping-methods/change-visibility/"+_id, {publish}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
  })
  export const deleteShippingMethod = createAsyncThunk("deleteShippingMethod",
    async ({_id}, thunkAPI) => {
      const {rejectWithValue} = thunkAPI
      return adminAPI.delete("/shipping-methods/"+_id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
  })

//   ----------------------------------------------
export const checkShippingMethodSlug = createAsyncThunk("checkShippingMethodSlug" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/shipping-methods/new/check-slug",body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
export const editShippingMethod = createAsyncThunk("editShippingMethod" ,
  async ({id,body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/shipping-methods/edit/"+id,body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })

export const deleteManyShippingMethods = createAsyncThunk("deleteManyShippingMethods",
  async (itemsSelected, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/shipping-methods/many/delete", {itemsSelected}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const updateManyShippingMethodsVisibility = createAsyncThunk("updateManyShippingMethodsVisibility",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/shipping-methods/many/update-visibility", body).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const getShippingMethod = createAsyncThunk("getShippingMethod",
  async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/shipping-methods/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})

const initState = {
    isLoading: false,
    isLoadingPage: false,
    isLoadingSlug: false
}
const shippingMethodsSlice = createSlice({
    name: "shippingMethods",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // New ShippingMethod
      .addCase(newShippingMethod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newShippingMethod.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(newShippingMethod.rejected, (state, action) => {
        state.isLoading = false;
      })
      // check Slug ShippingMethod
      .addCase(checkShippingMethodSlug.pending, (state) => {
        state.isLoadingSlug = true;
      })
      .addCase(checkShippingMethodSlug.fulfilled, (state, action) => {
        state.isLoadingSlug = false;
      })
      .addCase(checkShippingMethodSlug.rejected, (state, action) => {
        state.isLoadingSlug = false;
      })
      // GET ShippingMethods
      .addCase(getShippingMethods.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getShippingMethods.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getShippingMethods.rejected, (state, action) => {
        state.isLoadingPage = false;
      })
      // Change Visibility
      .addCase(changeVisibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeVisibility.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(deleteShippingMethod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShippingMethod.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteShippingMethod.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(deleteManyShippingMethods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteManyShippingMethods.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteManyShippingMethods.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(updateManyShippingMethodsVisibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateManyShippingMethodsVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateManyShippingMethodsVisibility.rejected, (state, action) => {
        state.isLoading = false;
      })
      // GET Atribute
      .addCase(getShippingMethod.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getShippingMethod.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getShippingMethod.rejected, (state, action) => {
        state.isLoadingPage = false;
      })
      // Edit Atribute
      .addCase(editShippingMethod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editShippingMethod.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editShippingMethod.rejected, (state, action) => {
        state.isLoading = false;
      })
    },
})

// export const counterActions = accountSlice.actions
export default shippingMethodsSlice.reducer