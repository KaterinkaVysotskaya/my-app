import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {packsAPI, PackType} from "../../api/packs-api";
import {setAppErrorAC, setAppStatusAC} from "../../app/appReducer";
import {handleServerNetworkError} from "../../common/utils/error-utils";
import axios, {AxiosError} from "axios";

export const getPacksTC = createAsyncThunk('packs/getPacks', async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await packsAPI.getPacks()
            console.log(res, 'res')
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {packs: res.data}
        } catch (error) {
            const e = error as Error | AxiosError
            if (axios.isAxiosError(e)) {
                const error = e.response?.data
                    ? (e.response.data as { error: string }).error
                    : e.message
                thunkAPI.dispatch(setAppErrorAC({error: error}))
                return thunkAPI.rejectWithValue({errors: [e.message], fieldsErrors: undefined})
            }
            handleServerNetworkError(e, thunkAPI.dispatch)
        }
    }
)

const slice = createSlice({
    name: 'packs',
    initialState: [] as Array<PackType>,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPacksTC.fulfilled, (state, action) => {
            // if (action.payload)
                // action.payload.packs.forEach((tl: any) => {
                //     state[tl.id] = []
        })}

})


export const packsReducer = slice.reducer