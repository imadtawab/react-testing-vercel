import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from '../../API/axios-global'

export const newCategory = createAsyncThunk("newCategory" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/categories/new",body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
export const checkCategorySlug = createAsyncThunk("checkCategorySlug" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/categories/new/check-slug",body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
export const editCategory = createAsyncThunk("editCategory" ,
  async ({id,body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/categories/edit/"+id,body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
  export const getCategories = createAsyncThunk("getCategories",
    async (_, thunkAPI) => {
      const {rejectWithValue} = thunkAPI
      return adminAPI.get("/categories"+window.location.search).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
  })
  export const getCategoriesForProduct = createAsyncThunk("getCategoriesForProduct",
    async (_, thunkAPI) => {
      const {rejectWithValue} = thunkAPI
      return adminAPI.get("/categories/for-product").then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
  })
export const changeVisibility = createAsyncThunk("changeVisibility",
  async ({id, publish}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.patch("/categories/change-visibility/"+id, {publish}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const deleteCategory = createAsyncThunk("deleteCategory",
  async ({id, publish}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.delete("/categories/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const deleteManyCategories = createAsyncThunk("deleteManyCategories",
  async (itemsSelected, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/categories/many/delete", {itemsSelected}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const updateManyCategoriesVisibility = createAsyncThunk("updateManyCategoriesVisibility",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/categories/many/update-visibility", body).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const getCategory = createAsyncThunk("getCategory",
  async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/categories/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})

const initState = {
    isLoading: false,
    isLoadingPage: false,
    isLoadingSlug: false
}
const categorySlice = createSlice({
    name: "category",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // New Category
      .addCase(newCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newCategory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(newCategory.rejected, (state, action) => {
        state.isLoading = false;
      })
      // check Slug Category
      .addCase(checkCategorySlug.pending, (state) => {
        state.isLoadingSlug = true;
      })
      .addCase(checkCategorySlug.fulfilled, (state, action) => {
        state.isLoadingSlug = false;
      })
      .addCase(checkCategorySlug.rejected, (state, action) => {
        state.isLoadingSlug = false;
      })
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
            // GET Categories
            .addCase(getCategoriesForProduct.pending, (state) => {
              state.isLoadingPage = true;
            })
            .addCase(getCategoriesForProduct.fulfilled, (state, action) => {
              state.isLoadingPage = false;
            })
            .addCase(getCategoriesForProduct.rejected, (state, action) => {
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
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(deleteManyCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteManyCategories.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteManyCategories.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(updateManyCategoriesVisibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateManyCategoriesVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateManyCategoriesVisibility.rejected, (state, action) => {
        state.isLoading = false;
      })
      // GET Atribute
      .addCase(getCategory.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoadingPage = false;
      })
      // Edit Atribute
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
      })
    },
})

// export const counterActions = accountSlice.actions
export default categorySlice.reducer