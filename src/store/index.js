import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';

import storage from 'redux-persist/lib/storage';

import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";


const rootReducer = combineReducers({
  user : userReducer,
});

const persistConfig = {
  key : 'root-kanban',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer : persistedReducer,
  middleware : getDefaultMiddleware => getDefaultMiddleware({serializableCheck : {
    ignoreActions : [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  }}),
});



export const persistor = persistStore(store);