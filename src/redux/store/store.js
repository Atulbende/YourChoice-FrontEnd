import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../../rtk/apiSlice";
import {persistReducer,persistStore } from "redux-persist";
import uiControlReducer from '../reducers/uiSlice';
import authReducer from "../reducers/authSlice";
import storage from "redux-persist/lib/storage";
import {axiosMiddleware} from '../../services/api/clientAPI'
// import {encryptTransform} from 'redux-persist-transform-encrypt';

// const encryptor = encryptTransform({
//     secretKey: 'your-secret-key',
//     onError: function(error) {
//       // Handle encryption/decryption errors here
//       console.error('Encryption error:', error);
//     }
//   });
const persistConfig={
        key:'auth',
        storage,
        // transforms: [encryptor], // Apply encryption transform

}

const persistedReducer =persistReducer( persistConfig,authReducer)
export const store=configureStore({
    reducer:{
        authControls: persistedReducer ,
        uiControls:uiControlReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware,axiosMiddleware),
});
export const persistedStore=persistStore(store);