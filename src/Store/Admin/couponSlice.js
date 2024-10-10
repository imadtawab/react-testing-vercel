import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from '../../API/axios-global'

export const newCoupon = createAsyncThunk("newCoupon" ,
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/coupons/new",body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })
export const getCoupons = createAsyncThunk("getCoupons",
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/coupons"+window.location.search).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const changeVisibility = createAsyncThunk("changeVisibility",
  async ({id, publish}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.patch("/coupons/change-visibility/"+id, {publish}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const deleteCoupon = createAsyncThunk("deleteCoupon",
  async ({id, publish}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.delete("/coupons/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const deleteManyCoupons = createAsyncThunk("deleteManyCoupons",
  async (itemsSelected, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/coupons/many/delete", {itemsSelected}).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const updateManyCouponsVisibility = createAsyncThunk("updateManyCouponsVisibility",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/coupons/many/update-visibility", body).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const getCoupon = createAsyncThunk("getCoupon",
  async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/coupons/"+id).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
export const editCoupon = createAsyncThunk("editCoupon" ,
  async ({id,body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/coupons/edit/"+id,body)
    .then(docs => docs.data)
    .catch(err => rejectWithValue(err.response.data || err))
  })


const initState = {
    isLoading: false,
    isLoadingPage: false,
}
const couponSlice = createSlice({
    name: "coupon",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // New Coupon
      .addCase(newCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(newCoupon.rejected, (state, action) => {
        state.isLoading = false;
      })
      // GET Coupons
      .addCase(getCoupons.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getCoupons.rejected, (state, action) => {
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
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(deleteManyCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteManyCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteManyCoupons.rejected, (state, action) => {
        state.isLoading = false;
      })
      // Change Visibility
      .addCase(updateManyCouponsVisibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateManyCouponsVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateManyCouponsVisibility.rejected, (state, action) => {
        state.isLoading = false;
      })
      // GET Atribute
      .addCase(getCoupon.pending, (state) => {
        state.isLoadingPage = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoadingPage = false;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoadingPage = false;
      })
      // Edit Atribute
      .addCase(editCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editCoupon.rejected, (state, action) => {
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
export default couponSlice.reducer