import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import propertySlice from "./propertySlice";
import ownerSlice from "./ownerSlice";
import adminSlice from "./adminSlice";
import userSlice from "./userSlice";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducers = combineReducers({
    auth: authSlice,

    property: propertySlice,
    owner:ownerSlice,
    admin:adminSlice,
    user:userSlice
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);