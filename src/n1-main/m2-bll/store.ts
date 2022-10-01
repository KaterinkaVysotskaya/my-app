import { combineReducers, createStore } from 'redux'
import {loginReducer} from "./loginReducer";


const reducers = combineReducers({
    login: loginReducer
})

const store = createStore(reducers)

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
