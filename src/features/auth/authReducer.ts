import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, RegisterParamsType} from "../../api/app-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {setAppStatusAC} from "../../app/appReducer";
import {setUserProfileAC} from "../profile/ProfileReducer";


const initialState = {
    isLoggedIn: false,
    addedUser: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        },
        addedUser(state, action: PayloadAction<{isAdded: boolean}>) {
            state.addedUser = action.payload.isAdded
        }
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions
export const {addedUser} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (!res.data.error) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status:'succeeded'}))
            dispatch(setUserProfileAC({userProfile: res.data}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any){
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log('Error: ', {...error})
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const resetForgotPasswordTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (!res.data.error) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status:'succeeded'}))
            dispatch(setUserProfileAC({userProfile: res.data}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any){
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log('Error: ', {...error})
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (!res.data.error) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.register(data)
        .then(res => {
            if (!res.data.error) {
                dispatch(addedUser({isAdded: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
// type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType