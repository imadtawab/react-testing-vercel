import { createSlice , createAsyncThunk, asyncThunkCreator } from "@reduxjs/toolkit"
import { clientAPI } from "../../API/axios-global"
import { countShoppingCartQuantity } from "../../Client/Utils/sideCartUtils"

export const getShoppingCart = createAsyncThunk("getShoppingCart",
  async (_, thunkAPI) => {
    return JSON.parse(localStorage.getItem("shoppingCart")) || []
})
export const deleteItemFromCart = createAsyncThunk("deleteItemFromCart",
  async ({prod_id, v_id}, thunkAPI) => {
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
    let newShoppingCart = shoppingCart.map(prod => {
      //  prod.productId !== prod.variants[0].variantId
      if (prod._id === prod_id) {
        if (prod.variants.length === 1 && prod.variants[0]._id === v_id) {
          return false
        }
        prod.variants.filter(v => {
console.log(v._id ," !== ", v_id)

          return v._id !== v_id
        })
        return {...prod, variants: prod.variants.filter(v => v._id !== v_id)}
      }
        return prod
    }).filter(p => p !== false)
    console.log(newShoppingCart);
    localStorage.setItem("shoppingCart", JSON.stringify(newShoppingCart))
    // return cardArray
    return newShoppingCart
})
export const addToCart = createAsyncThunk("addToCart",
  async ({product, variant}, thunkAPI) => {
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    if(shoppingCart) {
      let productExists = shoppingCart.find(prod => prod._id === product._id);
      if(productExists) {
        let variantExists = productExists.variants.find(v => v._id === variant._id)
        let newShoppingCart
        if(variantExists) {
          newShoppingCart = shoppingCart.map(prod => {
            if(prod._id === product._id) return {
              ...prod,
              variants: prod.variants.map(v => {
                if(v._id === variant._id) return {
                  ...v,
                  quantityUser: v.quantityUser + variant.quantityUser
                }
                return v
              })
            }
            return prod
          })
          // localStorage.setItem("shoppingCart", JSON.stringify(newShoppingCart))
        } else {
          newShoppingCart = shoppingCart.map(prod => {
            if(prod._id === product._id) return {
              ...prod,
              variants: [...prod.variants, variant]
            }
            return prod
          })
          console.log("variant Not Exisit", newShoppingCart);
        }
        localStorage.setItem("shoppingCart", JSON.stringify(newShoppingCart))
      } else {
        localStorage.setItem("shoppingCart", JSON.stringify([...shoppingCart, {...product, variants: [variant]}]));
      }
      // console.log(productExists);
    } else {
      localStorage.setItem("shoppingCart", JSON.stringify([{...product, variants: [variant]}]));
    }
    return true
})
export const changeQuantite = createAsyncThunk("changeQuantite",
  async ({action, v_id}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
    let newShoppingCart = shoppingCart.map(prod => {
      return {
        ...prod,
        variants: prod.variants.map(v => {
          if (v._id === v_id) {
            return {
              ...v,
              quantityUser: action === "plus" ? v.quantityUser < 10 ? v.quantityUser + 1 : v.quantityUser : v.quantityUser > 1 ? v.quantityUser - 1 : v.quantityUser
            }
          }
          return v
        })
      }
    })
    localStorage.setItem("shoppingCart", JSON.stringify(newShoppingCart))
    return newShoppingCart
})
// Wish List
export const addToWishList = createAsyncThunk("addToWishList",
  async (_id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    console.log(_id);
    if(localStorage.getItem("WISH_LIST")) {
      let wishList = JSON.parse(localStorage.getItem("WISH_LIST"))
      let itemExist = wishList.find(i => i === _id)
      if (!itemExist) {
        localStorage.setItem("WISH_LIST" , JSON.stringify([...wishList,_id]))
      }
    }else{
      localStorage.setItem("WISH_LIST" , JSON.stringify([_id]))
    }
    return _id
})
export const deleteFromWishList = createAsyncThunk("deleteProductWishList",
  async (_id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    let newWishList = JSON.parse(localStorage.getItem("WISH_LIST")).filter(item => item !== _id)
    localStorage.setItem("WISH_LIST" , JSON.stringify(newWishList))
    return _id
})
export const placeOrder = createAsyncThunk("placeOrder",
  async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return clientAPI.post("/customers/place-order", body).then(docs => docs.data).catch(err => rejectWithValue(err.response.data || err))
})
const initState = {
  isLoading: false,
  length:JSON.parse(localStorage.getItem("shoppingCart"))?.length || 0,
  wishListNumber:JSON.parse(localStorage.getItem("WISH_LIST"))?.length || 0
}

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // getShoppingCart
      .addCase(getShoppingCart.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getShoppingCart.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.length = countShoppingCartQuantity(action.payload)
      })
      .addCase(getShoppingCart.rejected, (state, action) => {
        // state.isLoading = false;
      })
      // deleteItemFromCart
      .addCase(deleteItemFromCart.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.length = countShoppingCartQuantity(action.payload)
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        // state.isLoading = false;
      })
      // addToWishList
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.wishListNumber = JSON.parse(localStorage.getItem("WISH_LIST")).length || 0
      })
      // deleteFromWishList
      .addCase(deleteFromWishList.fulfilled, (state, action) => {
        state.wishListNumber = JSON.parse(localStorage.getItem("WISH_LIST")).length || 0
      })

      // placeOrder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.removeItem("shoppingCart")
        state.length = 0
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
      })
    }
})

export default shoppingCartSlice.reducer
