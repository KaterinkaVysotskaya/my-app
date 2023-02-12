import {AnyAction, combineReducers} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authReducer} from "../features/auth/authReducer";
import {configureStore} from '@reduxjs/toolkit';
import {appReducer} from "./appReducer";
import {profileReducer} from "../features/profile/ProfileReducer";
import {useDispatch} from "react-redux";
import {packsReducer} from "../features/packs/packsReducer";
import {cardsReducer} from "../features/cards/cardsReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer

})
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})
export default store
export type AppStoreType = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export type AppDispatch = ThunkDispatch<AppStoreType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AnyAction>



// @ts-ignore
window.store = store // for dev
