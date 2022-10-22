import {AnyAction, combineReducers, createStore} from 'redux'
import {signInReducer} from "../features/auth/SingIn/SignInReducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authReducer} from "../features/auth/authReducer";
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./appReducer";
import {profileReducer} from "../features/profile/ProfileReducer";
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer
    // signIn: signInReducer,
    // signUp: signUpReducer
    // profile: profileReducer,

})
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})
export default store
export type AppStoreType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
// export type AppDispatch = ThunkDispatch<AppStoreType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AnyAction>

// @ts-ignore
window.store = store // for dev
