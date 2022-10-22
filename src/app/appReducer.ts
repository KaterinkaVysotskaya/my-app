import {Dispatch} from "redux";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/app-api";
import {setIsLoggedInAC} from "../features/auth/authReducer";
import {handleServerAppError, handleServerNetworkError} from "../common/utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error:  null as null | string,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppIitialisedAC(state, action: PayloadAction<{ isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

// type InitialStateType = typeof initialState

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppIitialisedAC } = slice.actions

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        let res = await authAPI.me()
        //if (res.data.error) { some dispatch} return }


        if (!res.data.error) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e){
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    } finally {
        dispatch(setAppIitialisedAC({isInitialized: true}))
    }
}

// export type AppActionsType =
//     |ReturnType <typeof setAppStatusAC>
//     |ReturnType <typeof setAppErrorAC>
//     |ReturnType <typeof setAppIitialisedAC>