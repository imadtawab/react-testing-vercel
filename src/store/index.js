import { configureStore, legacy_createStore } from '@reduxjs/toolkit' 
import productsReducer from './productsSlice';
import usersReducer from './usersSlice';
import orderReducer from './orderSlice';
import client_productsReducer from './client_productsSlice';
import categoriesReducer from './categoriesSlice';
import attributesReducer from './attributesSlice';
import modalReducer from './modalSlice';
import cartReducer from './secondCartSlice';



const store = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        orders: orderReducer,
        client_products: client_productsReducer,
        categories: categoriesReducer,
        attributes: attributesReducer,
        modal: modalReducer,
        cart: cartReducer,
    },
}) ; 
export default store ;
