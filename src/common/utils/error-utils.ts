import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../app/appReducer";
export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) =>{
    dispatch(setAppStatusAC({status: 'failed'} ))
    dispatch(setAppErrorAC({error: error.message}))
}

export const handleServerAppError = (data: any, dispatch:Dispatch ) => {
    if (data.error) {
        dispatch(setAppErrorAC({error: data.error[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error occured'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}