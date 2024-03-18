import { createSlice , createAsyncThunk, current } from "@reduxjs/toolkit"
import { adminAPI } from "../API/axios-global"
import undefined_avatar from "../assets/undefined_avatar.png"
import ClearStates from "../utils/ClearStates"
export const addAuthToState = createAsyncThunk("addAuthToState",
async (_auth, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get("/account/auth/addAuthToState",{
    headers: {"Authorization" : _auth},
  }).then(docs => {
    console.log(docs);
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const registerUser = createAsyncThunk("registerUser" ,
async (user, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/account/register",user).then(docs => {
      console.log(docs);
      if(!docs.data.success){
        console.log("object");
        return rejectWithValue({message: docs.data.error})
      }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const resendEmail = createAsyncThunk("resendEmail",
async (email,thunkAPI) => {
  console.log(email);
  const {rejectWithValue} = thunkAPI
  return adminAPI.post("/account/register/resend-email",{email}).then(docs => {
    console.log(docs);
    if(!docs.data.success){
      console.log("object");
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const forgotPassword = createAsyncThunk("forgotPassword",
async (email,thunkAPI) => {
  console.log(email);
  const {rejectWithValue} = thunkAPI
  return adminAPI.post("/account/login/forgot-password",{email}).then(docs => {
    console.log(docs);
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const forgotChangePassword = createAsyncThunk("forgotChangePassword",
async ({forgotPasswordCode , passwordObj},thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.post("/account/login/forgot-password/"+forgotPasswordCode,passwordObj).then(docs => {
    console.log(docs);
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const activationAccount = createAsyncThunk("activationAccount",
async (activationCode,thunkAPI) => {
  console.log(activationCode);
  const {rejectWithValue} = thunkAPI
  return adminAPI.post("/account/register/confirm_email/"+activationCode).then(docs => {
    console.log(docs);
    if(!docs.data.success){
      console.log("object");
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const loginUser = createAsyncThunk("loginUser" ,
async (user, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/account/login",user).then(docs => {
      if(!docs.data.success){
        return rejectWithValue({message: docs.data.error})
      }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const logout = createAsyncThunk("logout" ,
async () => {
    // const {rejectWithValue} = thunkAPI
    // return adminAPI.post("/account/login",user).then(docs => {
    //   if(!docs.data.success){
    //     return rejectWithValue({message: docs.data.error})
    //   }
    //     return docs.data
    // }).catch(err => rejectWithValue(err))
    return true
})

// Shopping Cart
export const addToCard = createAsyncThunk("addToCard",
async ({finalyProduct1,variant}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
    async function newShoppingCard(){
      if(localStorage.getItem("shoppingCard")){
        let cardArray = JSON.parse(localStorage.getItem("shoppingCard"))
        let productExist = await cardArray.find(prod => prod.productId === finalyProduct1.productId)
        if(productExist){
          let variantExist = await productExist.variants.find(v => v.variantId === variant.variantId)
          let newProduct
          if (variantExist) {
            newProduct = {
              ...productExist,
              variants: productExist.variants.map(v => {
                if(v.variantId === variant.variantId){
                  return variant
                }
                return v
              })
            }
          }else{
            newProduct = {
              ...productExist,
              variants: [...productExist.variants , variant]
            }
          }
          
          console.log(newProduct);
          let newArray = cardArray.map(prod => {
            if (prod.productId === finalyProduct1.productId) {
              return newProduct
            }
            return prod
          })
          localStorage.setItem("shoppingCard", JSON.stringify(newArray))
          console.log(newArray);
          return newArray
        }else{
          let newProduct = {
            ...finalyProduct1,
            variants: [variant]
          }
          localStorage.setItem("shoppingCard", JSON.stringify([...JSON.parse(localStorage.getItem("shoppingCard")),newProduct]))
          return JSON.parse(localStorage.getItem("shoppingCard"))
        }
      }else{
          let newProduct = {
            ...finalyProduct1,
            variants: [variant]
          }
          localStorage.setItem("shoppingCard", JSON.stringify([newProduct]))
          return [newProduct]
      }
    }
    // console.log(await newShoppingCard());
    return  {
      shoppingCard: await newShoppingCard(),
      product: {...finalyProduct1,variant}
    }
  // if(localStorage.getItem("shoppingCard")){
  //   // let productExist = JSON.parse(localStorage.getItem("shoppingCard")).find(p => p.product._id === product.product._id)
  //   let variantExist = JSON.parse(localStorage.getItem("shoppingCard")).find(p => p.variant.variantId === product.variant.variantId)
  //   // console.log(result);
  // if(variantExist) return rejectWithValue({message: "This Product Is Exist In Card"})
    
  //   localStorage.setItem("shoppingCard", JSON.stringify([...JSON.parse(localStorage.getItem("shoppingCard")) , product]))
  //   return [...JSON.parse(localStorage.getItem("shoppingCard")) , product]
  // }else{
  //   localStorage.setItem("shoppingCard", JSON.stringify([product]))
  //   return [product]
  // }
})
export const getShoppingCard = createAsyncThunk("getShoppingCard",
async (product, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  if(localStorage.getItem("shoppingCard")){
    
    return JSON.parse(localStorage.getItem("shoppingCard"))
  }else{
    return []
  }
})
export const deleteProductFromCard = createAsyncThunk("deleteProductFromCard",
async ({productId,variantId}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  let cardArray = await JSON.parse(localStorage.getItem("shoppingCard"))
  let newArray = cardArray.map(prod => {
    //  prod.productId !== prod.variants[0].variantId
    if (prod.productId === productId) {
      if (prod.variants.length === 1 && prod.variants[0].variantId === variantId) {
        return false
      }
      return {...prod, variants: prod.variants.filter(v => v.variantId !== variantId)}
    }
      return prod
  }).filter(p => p !== false)
  console.log(newArray);
  // console.log(newArray);
  localStorage.setItem("shoppingCard", JSON.stringify(newArray))
  // return cardArray
  return newArray
})
// Wish List
export const addToWishList = createAsyncThunk("addToWishList",
async (_id, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  console.log(_id);
  if(localStorage.getItem("WISH_LIST")) {
    let currentArray = JSON.parse(localStorage.getItem("WISH_LIST"))
    let itemExist = currentArray.filter(i => i === _id)[0]
    if (!itemExist) {
      localStorage.setItem("WISH_LIST" , JSON.stringify([...currentArray,_id]))
    }
  }else{
    localStorage.setItem("WISH_LIST" , JSON.stringify([_id]))
  }
  return JSON.parse(localStorage.getItem("WISH_LIST"))
    // async function newShoppingCard(){
      // if(localStorage.getItem("shoppingCard")){
      //   let cardArray = JSON.parse(localStorage.getItem("shoppingCard"))
      //   let productExist = await cardArray.find(prod => prod.productId === finalyProduct1.productId)
      //   if(productExist){
      //     let variantExist = await productExist.variants.find(v => v.variantId === variant.variantId)
      //     let newProduct
      //     if (variantExist) {
      //       newProduct = {
      //         ...productExist,
      //         variants: productExist.variants.map(v => {
      //           if(v.variantId === variant.variantId){
      //             return variant
      //           }
      //           return v
      //         })
      //       }
      //     }else{
      //       newProduct = {
      //         ...productExist,
      //         variants: [...productExist.variants , variant]
      //       }
      //     }
          
      //     console.log(newProduct);
      //     let newArray = cardArray.map(prod => {
      //       if (prod.productId === finalyProduct1.productId) {
      //         return newProduct
      //       }
      //       return prod
      //     })
      //     localStorage.setItem("shoppingCard", JSON.stringify(newArray))
      //     console.log(newArray);
      //     return newArray
      //   }else{
      //     let newProduct = {
      //       ...finalyProduct1,
      //       variants: [variant]
      //     }
      //     localStorage.setItem("shoppingCard", JSON.stringify([...JSON.parse(localStorage.getItem("shoppingCard")),newProduct]))
      //     return JSON.parse(localStorage.getItem("shoppingCard"))
      //   }
      // }else{
      //     let newProduct = {
      //       ...finalyProduct1,
      //       variants: [variant]
      //     }
      //     localStorage.setItem("shoppingCard", JSON.stringify([newProduct]))
      //     return [newProduct]
      // }
    // }
})
export const getWishList = createAsyncThunk("getWishList",
async (_, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  if(localStorage.getItem("WISH_LIST")){
    
    return JSON.parse(localStorage.getItem("WISH_LIST"))
  }else{
    return []
  }
})
export const deleteProductWishList = createAsyncThunk("deleteProductWishList",
async ({_id , products}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  let newProducts = products.filter(prod => prod._id !== _id)
  let newWishList = await JSON.parse(localStorage.getItem("WISH_LIST")).filter(item => item !== _id)
  localStorage.setItem("WISH_LIST" , JSON.stringify(newWishList))
  return {newProducts , newWishList}
})


export const changeQuantite = createAsyncThunk("changeQuantite",
async ({type, variantId}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  let cardArray = await JSON.parse(localStorage.getItem("shoppingCard"))
  let newArray = cardArray.map(prod => {
    return {
      ...prod,
      variants: prod.variants.map(v => {
        if (v.variantId === variantId) {
          return {
            ...v,
            quantiteUser: type === "plus" ? v.quantiteUser < 10 ? v.quantiteUser + 1 : v.quantiteUser : v.quantiteUser > 1 ? v.quantiteUser - 1 : v.quantiteUser
          }
        }
        return v
      })
    }
  })
  // let newArray = cardArray.map(prod => {
  //   if (prod.productId === variantId) {
  //     if (prod.variants.length === 1 && prod.variants[0].variantId === variantId) {
  //       return false
  //     }
  //     return {...prod, variants: prod.variants.filter(v => v.variantId !== variantId)}
  //   }
  //     return prod
  // }).filter(p => p !== false)
  console.log(newArray);
  // console.log(newArray);
  localStorage.setItem("shoppingCard", JSON.stringify(newArray))
  // return cardArray
  return newArray
})
export const newOrder = createAsyncThunk("newOrder",
async ({userInformation,product} , thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  await adminAPI.post("/orders/new-order",{userInformation,product}).then(docs => {
    console.log(docs);
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return docs.data
  }).catch(err => rejectWithValue(err))
})

export const updateProfile_settings = createAsyncThunk("updateProfile_settings" ,
async (newProfile , thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.put("account/settings/profile/update",newProfile).then((docs) => {
    if(!docs.data.success){
      console.log(docs.data,'wal 3adaaaaaaaaaaaaaaaaaaaaaab');
        return rejectWithValue({message: docs.data.error})
      }
    return docs.data
}).catch(err => rejectWithValue(err))
})
export const updatePassword_settings = createAsyncThunk("updatePassword_settings",
async (formObj, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.put("account/settings/password/update",formObj).then((docs) => {
    if(!docs.data.success){
      console.log(docs.data,'wal 3adaaaaaaaaaaaaaaaaaaaaaab');
        return rejectWithValue({message: docs.data.error})
      }
    return docs.data
}).catch(err => rejectWithValue(err))
})
const initState = {user: null, shoppingCard: [], wishList: [],
  registerUserStatus: {isLoading: false, error:false , success:false},
  loginUserStatus: {isLoading: false, error:false , success:false},
  addAuthToStateStatus: {isLoading: false, error:false , success:false},
  addToCardStatus :{isLoading: false, error:false , success:false},
  getShoppingCardStatus :{isLoading: false, error:false , success:false},
  deleteProductFromCardStatus :{isLoading: false, error:false , success:false},
  changeQuantiteStatus :{isLoading: false, error:false , success:false},
  newOrderStatus :{isLoading: false, error:false , success:false},
  
updateProfile_settings_Status:{isLoading: false , error: false , success: false},
updatePassword_settings_Status:{isLoading: false , error: false , success: false},
activationAccount_Status:{isLoading: false , error: false , success: false},
resendEmail_Status:{isLoading: false , error: false , success: false},
forgotPassword_Status:{isLoading: false , error: false , success: false},
forgotChangePassword_Status:{isLoading: false , error: false , success: false},
}
const clearStatesReducer = (state=initState , action) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
    return ClearStates(state , initState , action)
}

const usersSlice = createSlice({
    name: "users",
    initialState: initState,
    reducers: {
      states: clearStatesReducer
      },
    extraReducers: {
        // Register user
        [addAuthToState.pending]: (state,action) => {
                    console.log(action);
          state.addAuthToStateStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [addAuthToState.fulfilled]: (state,action) => {
          console.log(action.payload,999999996);
          state.user = {
            userName: action.payload.user.userName,
            email: action.payload.user.email,
            avatar: action.payload?.user?.avatar ? `${process.env.REACT_APP_SERVER_DOMAINE}/media/${action.payload?.user?.avatar}` : undefined_avatar,
            token: action.payload.token,
            phone: action.payload.user.phone,
          }
          state.addAuthToStateStatus={
            ...state.addAuthToStateStatus,
            isLoading : false,
            success: "Authorisation Success!"
          }
        },
        [addAuthToState.rejected]: (state,action) => {
          state.addAuthToStateStatus={
            ...state.addAuthToStateStatus,
            isLoading : false,
            error: action.payload.message
          }  
          window.location.href = "/admin/account/login"
        },

        // Register user
        [registerUser.pending]: (state,action) => {
          console.log(action);
          state.registerUserStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [registerUser.fulfilled]: (state,action) => {
          console.log(action);  
          // state.user = action.payload
          state.registerUserStatus={
            ...state.registerUserStatus,
            isLoading : false,
            success: "Register Successefully"
          }
        },
        [registerUser.rejected]: (state,action) => {
          console.log(action);
          state.registerUserStatus={
            ...state.registerUserStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // activationAccount user
        [activationAccount.pending]: (state,action) => {
          console.log(action);
          state.activationAccount_Status={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [activationAccount.fulfilled]: (state,action) => {
          console.log(action);  
          // state.user = action.payload
          state.activationAccount_Status={
            ...state.activationAccount_Status,
            isLoading : false,
            success: "Account is Activated"
          }
        },
        [activationAccount.rejected]: (state,action) => {
          console.log(action);
          state.activationAccount_Status={
            ...state.activationAccount_Status,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // Resend Email user
        [resendEmail.pending]: (state,action) => {
          console.log(action);
          state.resendEmail_Status={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [resendEmail.fulfilled]: (state,action) => {
          console.log(action);  
          // state.user = action.payload
          state.resendEmail_Status={
            ...state.resendEmail_Status,
            isLoading : false,
            success: "Email sended"
          }
        },
        [resendEmail.rejected]: (state,action) => {
          console.log(action);
          state.resendEmail_Status={
            ...state.resendEmail_Status,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // forgot password user
        [forgotPassword.pending]: (state,action) => {
          console.log(action);
          state.forgotPassword_Status={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [forgotPassword.fulfilled]: (state,action) => {
          console.log(action);  
          // state.user = action.payload
          state.forgotPassword_Status={
            ...state.forgotPassword_Status,
            isLoading : false,
            success: "Email sended ..."
          }
        },
        [forgotPassword.rejected]: (state,action) => {
          console.log(action);
          state.forgotPassword_Status={
            ...state.forgotPassword_Status,
            isLoading : false,
            error: action.payload.message
          }  
        },
                // Resend Email user
        [forgotChangePassword.pending]: (state,action) => {
          console.log(action);
          state.forgotChangePassword_Status={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [forgotChangePassword.fulfilled]: (state,action) => {
          console.log(action);  
          // state.user = action.payload
          state.forgotChangePassword_Status={
            ...state.forgotChangePassword_Status,
            isLoading : false,
            success: "Password saved ..."
          }
        },
        [forgotChangePassword.rejected]: (state,action) => {
          console.log(action);
          state.forgotChangePassword_Status={
            ...state.forgotChangePassword_Status,
            isLoading : false,
            error: action.payload.message
          }  
        },
                // forgot password and change  user
                [forgotPassword.pending]: (state,action) => {
                  console.log(action);
                  state.forgotPassword_Status={
                    isLoading : true,
                    error: false,
                    success: false
                  }
                },
                [forgotPassword.fulfilled]: (state,action) => {
                  console.log(action);  
                  // state.user = action.payload
                  state.forgotPassword_Status={
                    ...state.forgotPassword_Status,
                    isLoading : false,
                    success: "Email sended ..."
                  }
                },
                [forgotPassword.rejected]: (state,action) => {
                  console.log(action);
                  state.forgotPassword_Status={
                    ...state.forgotPassword_Status,
                    isLoading : false,
                    error: action.payload.message
                  }  
                },

        // Login user
        [loginUser.pending]: (state,action) => {
          console.log(action);
          state.loginUserStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [loginUser.fulfilled]: (state,action) => {
          // window.localStorage.setItem("token", action.payload.token)
          console.log(action);  
          state.user = {
            userName: action.payload.user.userName,
            email: action.payload.user.email,
            avatar: action.payload?.user?.avatar ? `${process.env.REACT_APP_SERVER_DOMAINE}/media/${action.payload?.user?.avatar}` : undefined_avatar,
            token: action.payload.token,
            phone: action.payload.user.phone,
          }
          state.loginUserStatus={
            ...state.loginUserStatus,
            isLoading : false,
            success: "Login Success!"
          }
        },
        [loginUser.rejected]: (state,action) => {
          console.log(action);
          state.loginUserStatus={
            ...state.loginUserStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },



        // add to Card
        [addToCard.pending]: (state , action) => {
          console.log(action);
          state.addToCardStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [addToCard.fulfilled]: (state , action) => {
          console.log(action.payload,55555555);
          state.shoppingCard = action.payload.shoppingCard
          state.addToCardStatus = {
            ...state.addToCardStatus,
            isLoading: false,
            success : action.payload.shoppingCard
          }
        },
        [addToCard.rejected]: (state , action) => {
          console.log(action);
          state.addToCardStatus = {
            ...state.addToCardStatus,
            isLoading: false,
            error : action.payload.message || "Failed To Add Product"
          }
        },
                // WISH LIST
                [getWishList.pending]: (state , action) => {
                  // console.log(action);
                  // state.addToCardStatus = {
                  //   isLoading: true,
                  //   error:false,
                  //   success : false
                  // }
                },
                [getWishList.fulfilled]: (state , action) => {
                  // console.log(action.payload,55555555);
                  state.wishList = action.payload
                  // state.addToCardStatus = {
                  //   ...state.addToCardStatus,
                  //   isLoading: false,
                  //   success : action.payload
                  // }
                },
                [getWishList.rejected]: (state , action) => {
                  console.log(action);
                  // state.addToCardStatus = {
                  //   ...state.addToCardStatus,
                  //   isLoading: false,
                  //   error : action.payload.message || "Failed To Add Product"
                  // }
                },
                                // WISH LIST
                                [addToWishList.pending]: (state , action) => {
                                  // console.log(action);
                                  // state.addToCardStatus = {
                                  //   isLoading: true,
                                  //   error:false,
                                  //   success : false
                                  // }
                                },
                                [addToWishList.fulfilled]: (state , action) => {
                                  // console.log(action.payload,55555555);
                                  state.wishList = action.payload
                                  // state.addToCardStatus = {
                                  //   ...state.addToCardStatus,
                                  //   isLoading: false,
                                  //   success : action.payload
                                  // }
                                },
                                [addToWishList.rejected]: (state , action) => {
                                  console.log(action);
                                  // state.addToCardStatus = {
                                  //   ...state.addToCardStatus,
                                  //   isLoading: false,
                                  //   error : action.payload.message || "Failed To Add Product"
                                  // }
                                },
                                                                // WISH LIST
                                                                [deleteProductWishList.pending]: (state , action) => {
                                                                  // console.log(action);
                                                                  // state.addToCardStatus = {
                                                                  //   isLoading: true,
                                                                  //   error:false,
                                                                  //   success : false
                                                                  // }
                                                                },
                                                                [deleteProductWishList.fulfilled]: (state , action) => {
                                                                  // console.log(action.payload,55555555);
                                                                  state.wishList = action.payload.newWishList
                                                                  // state.addToCardStatus = {
                                                                  //   ...state.addToCardStatus,
                                                                  //   isLoading: false,
                                                                  //   success : action.payload
                                                                  // }
                                                                },
                                                                [deleteProductWishList.rejected]: (state , action) => {
                                                                  console.log(action);
                                                                  // state.addToCardStatus = {
                                                                  //   ...state.addToCardStatus,
                                                                  //   isLoading: false,
                                                                  //   error : action.payload.message || "Failed To Add Product"
                                                                  // }
                                                                },

        // delete product from card
        [deleteProductFromCard.pending]: (state , action) => {
          console.log(action);
          state.deleteProductFromCardStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [deleteProductFromCard.fulfilled]: (state , action) => {
          console.log(action);
          // state.shoppingCard = []
          state.shoppingCard = action.payload
          state.deleteProductFromCardStatus = {
            ...state.deleteProductFromCardStatus,
            isLoading: false,
            success : "Product Delete From Card"
          }
        },
        [deleteProductFromCard.rejected]: (state , action) => {
          console.log(action);
          state.deleteProductFromCardStatus = {
            ...state.deleteProductFromCardStatus,
            isLoading: false,
            error : action?.payload?.message || "Failed To Delete Product"
          }
        },

        // changeQuantite
        [changeQuantite.pending]: (state , action) => {
          console.log(action);
          state.changeQuantiteStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [changeQuantite.fulfilled]: (state , action) => {
          console.log(action);
          state.shoppingCard = action.payload
          state.changeQuantiteStatus = {
            ...state.changeQuantiteStatus,
            isLoading: false,
            success : "Quantite Updated"
          }
        },
        [changeQuantite.rejected]: (state , action) => {
          console.log(action);
          state.changeQuantiteStatus = {
            ...state.changeQuantiteStatus,
            isLoading: false,
            error : action?.payload?.message || "Failed To Change Quantite"
          }
        },

        // get shopping card
        [getShoppingCard.pending]: (state , action) => {
          // console.log(action);
          state.getShoppingCardStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [getShoppingCard.fulfilled]: (state , action) => {
          // console.log(action);
          state.shoppingCard = action.payload
          state.getShoppingCardStatus = {
            ...state.getShoppingCardStatus,
            isLoading: false,
            success : "products ......"
          }
        },
        [getShoppingCard.rejected]: (state , action) => {
          // console.log(action);
          state.getShoppingCardStatus = {
            ...state.getShoppingCardStatus,
            isLoading: false,
            error : action.payload.message
          }
        },
        // newOrder
        [newOrder.pending]: (state , action) => {
          console.log(action);
          state.newOrderStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [newOrder.fulfilled]: (state , action) => {
          console.log(action);
          // state.shoppingCard = []
          state.newOrderStatus = {
            ...state.newOrderStatus,
            isLoading: false,
            success : "Place Order Success"
          }
        },
        [newOrder.rejected]: (state , action) => {
          console.log(action);
          state.newOrderStatus = {
            ...state.newOrderStatus,
            isLoading: false,
            error : action.payload.message
          }
        },
        // logout
        [logout.fulfilled]: (state,action) => {
          state.user = null
        },
        // update profile settings
        [updateProfile_settings.pending]: (state,action) => {
          console.log(action);
          state.updateProfile_settings_Status={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [updateProfile_settings.fulfilled]: (state,action) => {
          // state.user = action.payload.data
          console.log(action.payload,3333333);
          state.updateProfile_settings_Status={
            ...state.updateProfile_settings_Status,
            isLoading : false,
            success: "Profile Updated !"
          }
          state.user = {
            ...state.user,
            ...action.payload.data,
            // userName: action.payload.user.userName,
            // email: action.payload.user.email,
            // token: action.payload.token,
            // phone: action.payload.user.phone,
          }
          // if (action.payload.avatar !== state.user.avatar){
          // state.user.avatar= action.payload?.data?.avatar ? "${process.env.REACT_APP_SERVER_DOMAINE}/media/"+action.payload?.user?.avatar : undefined_avatar
          // }
          // dont complited
          if(action.payload.data.avatar){
            console.log(8888888);
            state.user.avatar= `${process.env.REACT_APP_SERVER_DOMAINE}/media/${action.payload.data.avatar}`
            return
          }
          if (action.payload.data.emptyAvatar) {
            state.user.avatar= undefined_avatar
            return
          }
        },
        [updateProfile_settings.rejected]: (state,action) => {
          console.log(action.payload, 22);
          state.updateProfile_settings_Status={
            ...state.updateProfile_settings_Status,
            isLoading : false,
            error: action.payload.message
          }  
        },
                // update password settings
                [updatePassword_settings.pending]: (state,action) => {
                  console.log(action);
                  state.updatePassword_settings_Status={
                    isLoading : true,
                    error: false,
                    success: false
                  }
                },
                [updatePassword_settings.fulfilled]: (state,action) => {
                  console.log(action.payload, 22);
                  state.updatePassword_settings_Status={
                    ...state.updatePassword_settings_Status,
                    isLoading : false,
                    success: action.payload.success
                  }
                },
                [updatePassword_settings.rejected]: (state,action) => {
                  state.updatePassword_settings_Status={
                    ...state.updatePassword_settings_Status,
                    isLoading : false,
                    error: action.payload.message
                  }  
                },

       
                
    }
})


export const counterActions = usersSlice.actions
export default usersSlice.reducer
