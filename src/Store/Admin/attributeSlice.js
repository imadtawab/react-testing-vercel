import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from '../../API/axios-global'

export const newAttribute = createAsyncThunk("newAttribute" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/attributes/new",body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
export const editAttribute = createAsyncThunk("editAttribute" ,
  async ({id,body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/attributes/edit/"+id,body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
export const getAttributes = createAsyncThunk("getAttributes",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/attributes"+window.location.search).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const changeVisibility = createAsyncThunk("changeVisibility",
  async ({id, publish}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.patch("/attributes/change-visibility/"+id, {publish}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const deleteAttribute = createAsyncThunk("deleteAttribute",
  async ({id, publish}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.delete("/attributes/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const deleteManyAttributes = createAsyncThunk("deleteManyAttributes",
  async (itemsSelected, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/attributes/many/delete", {itemsSelected}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const updateManyAttributesVisibility = createAsyncThunk("updateManyAttributesVisibility",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/attributes/many/update-visibility", body).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const getAttribute = createAsyncThunk("getAttribute",
  async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/attributes/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
// export const newAttrbiuteValue = createAsyncThunk("newAttrbiuteValue" ,
//   async ({id,body}, thunkAPI) => {
//     const {rejectWithValue} = thunkAPI
//     return adminAPI.post("/attributes/values/"+id,body)
//     .then(docs => docs.data)
//     .catch(err => rejectWithValue(err.response.data || err))
//   })
const initState = {
    isLoading: false,
    isLoadingPage: false,
}
const attributeSlice = createSlice({
    name: "attribute",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // New Attribute
      .addCase(newAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newAttribute.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(newAttribute.rejected, (state, action) => {
        state.isLoading = false;
      })
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
      .addCase(deleteAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAttribute.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(deleteManyAttributes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteManyAttributes.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteManyAttributes.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(updateManyAttributesVisibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateManyAttributesVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateManyAttributesVisibility.rejected, (state, action) => {
        state.isLoading = false;
      })
      // GET Atribute
      .addCase(getAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttribute.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAttribute.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Edit Atribute
      .addCase(editAttribute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAttribute.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editAttribute.rejected, (state, action) => {
        state.isLoading = false;
      })
      // // add attrbiute value
      // .addCase(newAttrbiuteValue.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(newAttrbiuteValue.fulfilled, (state, action) => {
      //   state.isLoading = false;
      // })
      // .addCase(newAttrbiuteValue.rejected, (state, action) => {
      //   state.isLoading = false;
      // })
    },
})

// export const counterActions = accountSlice.actions
export default attributeSlice.reducer