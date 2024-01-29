import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from "../API/axios-global"

// ATTRIBUTES START
export const createAttributes = createAsyncThunk("createAttributes" , 
async (form, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.post("/account/attributes/new",form).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const getAttributes = createAsyncThunk("getAttributes",
async (_, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get("/account/attributes").then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const deleteAttribute = createAsyncThunk("deleteAttribute",
async (id, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.delete("/account/attributes/delete/"+id).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const changeAttributeVisibility = createAsyncThunk("changeAttributeVisibility",
async ({id,visibility}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.put("/account/attributes/change-visibility",{id,visibility}).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const updateAttribute = createAsyncThunk("updateAttribute",
async ({form, _id}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.put("/account/attributes/update/"+_id,form).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const updateManyStatus_attributes = createAsyncThunk("updateManyStatus_attributes",
async ({items, status}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/account/attributes/update-many-status",{items, status}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const deleteManyStatus_attributes = createAsyncThunk("deleteManyStatus_attributes",
async (items, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/account/attributes/delete-many-status",{items}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
// ATTRIBUTES END


const initState = {
  createAttributesStatus :{isLoading: false, error:false , success:false},
  getAttributesStatus :{isLoading: false, error:false , success:false},
  deleteAttributeStatus :{isLoading: false, error:false , success:false},
  updateAttributeStatus :{isLoading: false, error:false , success:false},
  changeAttributeVisibilityStatus :{isLoading: false, error:false , success:false},
  updateManyStatus_attributes_Status:{isLoading: false , error: false , success: false},
  deleteManyStatus_attributes_Status:{isLoading: false , error: false , success: false},
}

const attributesSlice = createSlice({
    name: "attributes",
    initialState: initState,
    reducers: {
      
    },
    extraReducers: {
        // create attribute
        [createAttributes.pending]: (state,action) => {
          console.log(action);
          state.createAttributesStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [createAttributes.fulfilled]: (state,action) => {
          console.log(action.payload);
          state.getAttributesStatus.success = action.payload.data
          state.createAttributesStatus={
            ...state.createAttributesStatus,
            isLoading : false,
            success: "Create Attribute Success"
          }
        },
        [createAttributes.rejected]: (state,action) => {
          console.log(action);
          state.createAttributesStatus={
            ...state.createAttributesStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },

        // get Attributes
        [getAttributes.pending]: (state,action) => {
          console.log(action);
          state.getAttributesStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [getAttributes.fulfilled]: (state,action) => {
          state.getAttributesStatus={
            ...state.getAttributesStatus,
            isLoading : false,
            success: action.payload.data
          }
        },
        [getAttributes.rejected]: (state,action) => {
          console.log(action);
          state.getAttributesStatus={
            ...state.getAttributesStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },

        // delete attribute
        [deleteAttribute.pending]: (state,action) => {
          console.log(action);
          state.deleteAttributeStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [deleteAttribute.fulfilled]: (state,action) => {
          state.getAttributesStatus.success = state.getAttributesStatus.success.filter(c => c._id !== action.payload._id);
          state.deleteAttributeStatus={
            ...state.deleteAttributeStatus,
            isLoading : false,
            success: "Attribute Deleted !"
          }
        },
        [deleteAttribute.rejected]: (state,action) => {
          console.log(action);
          state.deleteAttributeStatus={
            ...state.deleteAttributeStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },

        // change visibility attribute
        [changeAttributeVisibility.pending]: (state,action) => {
          console.log(action);
          state.changeAttributeVisibilityStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [changeAttributeVisibility.fulfilled]: (state,action) => {
          console.log(action);
          state.getAttributesStatus.success = state.getAttributesStatus.success.map(c => {
            if(c._id === action.payload._id){
              return {
                ...c,
                publish : (action.payload.visibility === "true" ? "false" : "true")
              }
            }
            return c
          });
          state.changeAttributeVisibilityStatus={
            ...state.changeAttributeVisibilityStatus,
            isLoading : false,
            success: "Visibility Changed !"
          }
        },
        [changeAttributeVisibility.rejected]: (state,action) => {
          console.log(action);
          state.changeAttributeVisibilityStatus={
            ...state.changeAttributeVisibilityStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },

        // update Many Status product
        [updateManyStatus_attributes.pending]: (state, action) => {
          console.log(action)
          state.updateManyStatus_attributes_Status = {
              isLoading: true,
              error: false,
              success: false
          }
      },
      [updateManyStatus_attributes.fulfilled]: (state, action) => {
        state.getAttributesStatus.success = state.getAttributesStatus.success.map(c => {
            if(action.payload.items.indexOf(c._id) !== -1){
              return {
                ...c,
                publish: action.payload.status
              }
            }
            return c
          })
          console.log(action)
          state.updateManyStatus_attributes_Status = {
              ...state.updateManyStatus_attributes_Status,
              isLoading: false,
              success: action.payload.items.length + " Orders Status Updated"
          }
      },
      [updateManyStatus_attributes.rejected]: (state, action) => {
          state.updateManyStatus_attributes_Status = {
              ...state.updateManyStatus_attributes_Status,
              isLoading: false,
              error: action.payload.message
          }
      },

      // delete Many product
      [deleteManyStatus_attributes.pending]: (state, action) => {
          console.log(action)
          state.deleteManyStatus_attributes_Status = {
              isLoading: true,
              error: false,
              success: false
          }
      },
      [deleteManyStatus_attributes.fulfilled]: (state, action) => {
        state.getAttributesStatus.success = state.getAttributesStatus.success.filter(c => action.payload.items.indexOf(c._id) === -1)
        console.log(action)
          state.deleteManyStatus_attributes_Status = {
              ...state.deleteManyStatus_attributes_Status,
              isLoading: false,
              success: action.payload.items.length + " Attributes Deleted"
          }
      },
      [deleteManyStatus_attributes.rejected]: (state, action) => {
          state.deleteManyStatus_attributes_Status = {
              ...state.deleteManyStatus_attributes_Status,
              isLoading: false,
              error: action.payload.message
          }
      },

        // update attribute
        [updateAttribute.pending]: (state,action) => {
          console.log(action);
          state.updateAttributeStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [updateAttribute.fulfilled]: (state,action) => {
        //   state.getAttributesStatus.success = action.payload.data
          state.updateAttributeStatus={
            ...state.updateAttributeStatus,
            isLoading : false,
            success: "Attribute Updated !"
          }
        },
        [updateAttribute.rejected]: (state,action) => {
          console.log(action);
          state.updateAttributeStatus={
            ...state.updateAttributeStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },



        // ATTRIBUTES END
                
    }
})


export const counterActions = attributesSlice.actions
export default attributesSlice.reducer
