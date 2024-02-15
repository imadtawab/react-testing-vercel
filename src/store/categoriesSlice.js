import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAPI } from "../API/axios-global";
import ClearStates from "../utils/ClearStates";

// CATEGORIES START
export const createCategories = createAsyncThunk(
  "createCategories",
  async ({form}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(form);
    return adminAPI
      .post("/account/categories/new/", form)
      .then((docs) => {
        if (!docs.data.success) {
          return rejectWithValue({ message: docs.data.error });
        }
        return docs.data;
      })
      .catch((err) => rejectWithValue(err));
  }
);
export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return adminAPI
      .get("/account/categories")
      .then((docs) => {
        if (!docs.data.success) {
          return rejectWithValue({ message: docs.data.error });
        }
        return docs.data;
      })
      .catch((err) => rejectWithValue(err));
  }
);
export const deleteCategorie = createAsyncThunk(
  "deleteCategorie",
  async (catg ,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return adminAPI
      .delete(`/account/categories/delete/` + catg._id +"/" + (catg.image || "undefined"))
      .then((docs) => {
        if (!docs.data.success) {
          return rejectWithValue({ message: docs.data.error });
        }
        return docs.data;
      })
      .catch((err) => rejectWithValue(err));
  }
);
export const changeCategorieVisibility = createAsyncThunk(
  "changeCategorieVisibility",
  async ({ id, visibility }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return adminAPI
      .put("/account/categories/change-visibility", { id, visibility })
      .then((docs) => {
        if (!docs.data.success) {
          return rejectWithValue({ message: docs.data.error });
        }
        return docs.data;
      })
      .catch((err) => rejectWithValue(err));
  }
);
export const updateCategorie = createAsyncThunk(
  "updateCategorie",
  async ({form, _id , image}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return adminAPI
      .put("/account/categories/update/"+_id +"/" + (image || "undefined"), form)
      .then((docs) => {
        if (!docs.data.success) {
          return rejectWithValue({ message: docs.data.error });
        }
        return docs.data;
      })
      .catch((err) => rejectWithValue(err));
  }
);
export const updateManyStatus_categories = createAsyncThunk(
  "updateManyStatus_categories",
  async ({ items, status }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return adminAPI
      .put("/account/categories/update-many-status", { items, status })
      .then((docs) => {
        if (!docs.data.success) {
          return rejectWithValue({ message: docs.data.error });
        }
        return docs.data;
      })
      .catch((err) => rejectWithValue(err));
  }
);
export const deleteManyStatus_categories = createAsyncThunk(
  "deleteManyStatus_categories",
  async (items, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return adminAPI
      .put("/account/categories/delete-many-status", { items })
      .then((docs) => {
        if (!docs.data.success) {
          return rejectWithValue({ message: docs.data.error });
        }
        return docs.data;
      })
      .catch((err) => rejectWithValue(err));
  }
);
export const checkCategorySlug = createAsyncThunk("checkCategorySlug",
async (body, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/account/categories/check-slug",body).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
        }
        console.log(docs.data);
        return docs.data
    }).catch(err => rejectWithValue(err))
})
// CATEGORIES END
const clearStatesReducer = (state=initState , action) => {
  return ClearStates(state , initState , action)
}
const initState = {
    createCategoriesStatus: { isLoading: false, error: false, success: false },
    getCategoriesStatus: { isLoading: false, error: false, success: [] },
    deleteCategorieStatus: { isLoading: false, error: false, success: false },
    updateCategorieStatus: { isLoading: false, error: false, success: false },
    changeCategorieVisibilityStatus: {
        isLoading: false,
        error: false,
        success: false,
    },
    updateManyStatus_categories_Status: {
        isLoading: false,
        error: false,
        success: false,
    },
    deleteManyStatus_categories_Status: {
        isLoading: false,
        error: false,
        success: false,
    },
    checkCategorySlug_Status:{isLoading: false , error: false , success: false},

};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initState,
  reducers: {
    states: clearStatesReducer
  },
  extraReducers: {
    
    // create categorie
    [createCategories.pending]: (state, action) => {
      console.log(action);
      state.createCategoriesStatus = {
        isLoading: true,
        error: false,
        success: false,
      };
    },
    [createCategories.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.getCategoriesStatus.success = action.payload.data;
      state.createCategoriesStatus = {
        ...state.createCategoriesStatus,
        isLoading: false,
        success: "Create Categorie Success",
      };
    },
    [createCategories.rejected]: (state, action) => {
      console.log(action);
      state.createCategoriesStatus = {
        ...state.createCategoriesStatus,
        isLoading: false,
        error: action.payload.message,
      };
    },

    // get Categories
    [getCategories.pending]: (state, action) => {
      console.log(action);
      state.getCategoriesStatus = {
        isLoading: true,
        error: false,
        success: [],
      };
    },
    [getCategories.fulfilled]: (state, action) => {
    console.log(action);
      state.getCategoriesStatus = {
        ...state.getCategoriesStatus,
        isLoading: false,
        success: action.payload.data,
      };
    },
    [getCategories.rejected]: (state, action) => {
      console.log(action);
      state.getCategoriesStatus = {
        ...state.getCategoriesStatus,
        isLoading: false,
        error: action.payload.message,
      };
    },

    // delete categorie
    [deleteCategorie.pending]: (state, action) => {
      console.log(action);
      state.deleteCategorieStatus = {
        isLoading: true,
        error: false,
        success: false,
      };
    },
    [deleteCategorie.fulfilled]: (state, action) => {
      console.log(action,222222222);
      state.getCategoriesStatus.success = state.getCategoriesStatus.success.filter(c => c._id !== action.payload._id);
      state.deleteCategorieStatus = {
        ...state.deleteCategorieStatus,
        isLoading: false,
        success: "Categorie Deleted !",
      };
    },
    [deleteCategorie.rejected]: (state, action) => {
      console.log(action);
      state.deleteCategorieStatus = {
        ...state.deleteCategorieStatus,
        isLoading: false,
        error: action.payload.message,
      };
    },

    // change visibility categorie
    [changeCategorieVisibility.pending]: (state, action) => {
      console.log(action);
      state.changeCategorieVisibilityStatus = {
        isLoading: true,
        error: false,
        success: false,
      };
    },
    [changeCategorieVisibility.fulfilled]: (state, action) => {
      console.log(action);
      state.getCategoriesStatus.success = state.getCategoriesStatus.success.map(c => {
        if(c._id === action.payload._id){
          return {
            ...c,
            publish : (action.payload.visibility === "true" ? "false" : "true")
          }
        }
        return c
      });
      state.changeCategorieVisibilityStatus = {
        ...state.changeCategorieVisibilityStatus,
        isLoading: false,
        success: "Visibility Changed !",
      };
    },
    [changeCategorieVisibility.rejected]: (state, action) => {
      console.log(action);
      state.changeCategorieVisibilityStatus = {
        ...state.changeCategorieVisibilityStatus,
        isLoading: false,
        error: action.payload.message,
      };
    },

    // update Many Status product
    [updateManyStatus_categories.pending]: (state, action) => {
      console.log(action);
      state.updateManyStatus_categories_Status = {
        isLoading: true,
        error: false,
        success: false,
      };
    },
    [updateManyStatus_categories.fulfilled]: (state, action) => {

      state.getCategoriesStatus.success = state.getCategoriesStatus.success.map(c => {
        if(action.payload.items.indexOf(c._id) !== -1){
          return {
            ...c,
            publish: action.payload.status
          }
        }
        return c
      })
      console.log(action);
      state.updateManyStatus_categories_Status = {
        ...state.updateManyStatus_categories_Status,
        isLoading: false,
        success: action.payload.items.length + " Orders Status Updated",
      };
    },
    [updateManyStatus_categories.rejected]: (state, action) => {
      state.updateManyStatus_categories_Status = {
        ...state.updateManyStatus_categories_Status,
        isLoading: false,
        error: action.payload.message,
      };
    },

    // delete Many product
    [deleteManyStatus_categories.pending]: (state, action) => {
      console.log(action);
      state.deleteManyStatus_categories_Status = {
        isLoading: true,
        error: false,
        success: false,
      };
    },
    [deleteManyStatus_categories.fulfilled]: (state, action) => {
      state.getCategoriesStatus.success = state.getCategoriesStatus.success.filter(c => action.payload.items.indexOf(c._id) === -1)
      console.log(action);
      state.deleteManyStatus_categories_Status = {
        ...state.deleteManyStatus_categories_Status,
        isLoading: false,
        success: action.payload.items.length + " Categories Deleted",
      };
    },
    [deleteManyStatus_categories.rejected]: (state, action) => {
      state.deleteManyStatus_categories_Status = {
        ...state.deleteManyStatus_categories_Status,
        isLoading: false,
        error: action.payload.message,
      };
    },

    // update categorie
    [updateCategorie.pending]: (state, action) => {
      console.log(action);
      state.updateCategorieStatus = {
        isLoading: true,
        error: false,
        success: false,
      };
    },
    [updateCategorie.fulfilled]: (state, action) => {
      // state.getCategoriesStatus.success = state.getCategoriesStatus.success.map(c => {
      //   if(c._id === action.payload._id){
      //     return action.payload.newCateg
      //   }
      //   return c
      // });
      state.updateCategorieStatus = {
        ...state.updateCategorieStatus,
        isLoading: false,
        success: "Categorie Updated !",
      };
    },
    [updateCategorie.rejected]: (state, action) => {
      console.log(action);
      state.updateCategorieStatus = {
        ...state.updateCategorieStatus,
        isLoading: false,
        error: action.payload.message,
      };
    },
                    // check product url Key
                    [checkCategorySlug.pending]: (state, action) => {
                      console.log(action)
                      state.checkCategorySlug_Status = {
                          isLoading: true,
                          error: false,
                          success: false
                      }
                  },
                  [checkCategorySlug.fulfilled]: (state, action) => {
                      console.log(action)
                      state.checkCategorySlug_Status = {
                          ...state.checkCategorySlug_Status,
                          isLoading: false,
                          success: action.payload.data
                      }
                  },
                  [checkCategorySlug.rejected]: (state, action) => {
                      console.log(action)
                      state.checkCategorySlug_Status = {
                          ...state.checkCategorySlug_Status,
                          isLoading: false,
                          error: action.payload.message
                      }
                  },

    // ATTRIBUTES END
  },
});

export const counterActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
