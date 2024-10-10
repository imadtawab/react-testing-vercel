import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from '../../API/axios-global'

export const newProduct = createAsyncThunk("newProduct" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/products/new",body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
  export const saveVariants = createAsyncThunk("saveVariants" ,
    async ({id, body}, thunkAPI) => {
      console.log(id)
      const {rejectWithValue} = thunkAPI
      return adminAPI.post("/products/variants/"+id,body)
      .then(docs => docs.data)
      .catch(err => rejectWithValue(err.response.data || err))
    })
export const checkProductSlug = createAsyncThunk("checkProductSlug" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/products/new/check-slug",body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
})
export const editProduct = createAsyncThunk("editProduct" ,
  async ({id,body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/products/edit/"+id,body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
export const getProducts = createAsyncThunk("getProducts",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/products"+window.location.search).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const changeVisibility = createAsyncThunk("changeVisibility",
  async ({id, publish}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.patch("/products/change-visibility/"+id, {publish}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const deleteProduct = createAsyncThunk("deleteProduct",
  async ({id}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.delete("/products/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const deleteManyProducts = createAsyncThunk("deleteManyProducts",
  async (itemsSelected, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/products/many/delete", {itemsSelected}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const updateManyProductsVisibility = createAsyncThunk("updateManyProductsVisibility",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/products/many/update-visibility", body).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const getProduct = createAsyncThunk("getProduct",
  async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/products/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const getAttributesForVariants = createAsyncThunk("getAttributesForVariants",
  async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/products/attributes-for-variants/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})


const initState = {
    isLoading: false,
    isLoadingPage: false,
    isLoadingSlug: false
}
const productSlice = createSlice({
    name: "product",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // New Product
      .addCase(newProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(newProduct.rejected, (state, action) => {
        state.isLoading = false;
      })
      // New Product
      .addCase(saveVariants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveVariants.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(saveVariants.rejected, (state, action) => {
        state.isLoading = false;
      })
      // check Slug Product
      .addCase(checkProductSlug.pending, (state) => {
        state.isLoadingSlug = true;
      })
      .addCase(checkProductSlug.fulfilled, (state, action) => {
        state.isLoadingSlug = false;
      })
      .addCase(checkProductSlug.rejected, (state, action) => {
        state.isLoadingSlug = false;
      })
      // GET Products
      .addCase(getProducts.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
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
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(deleteManyProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteManyProducts.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteManyProducts.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(updateManyProductsVisibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateManyProductsVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateManyProductsVisibility.rejected, (state, action) => {
        state.isLoading = false;
      })
      // GET Atribute
      .addCase(getProduct.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoadingPage = false;
      })
      // Edit Atribute
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
      })
      // getAttributesForVariants
      .addCase(getAttributesForVariants.pending, (state) => {
        state.isLoadingSlug = true;
      })
      .addCase(getAttributesForVariants.fulfilled, (state, action) => {
        state.isLoadingSlug = false;
      })
      .addCase(getAttributesForVariants.rejected, (state, action) => {
        state.isLoadingSlug = false;
      })
    },
})

// export const counterActions = accountSlice.actions
export default productSlice.reducer