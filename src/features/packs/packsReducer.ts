import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardPacksBase, ChangedCardsPackType, NewCardsPackType, packsAPI, PackType} from "../../api/packs-api";
import {setAppErrorAC, setAppStatusAC} from "../../app/appReducer";
import {handleServerNetworkError} from "../../common/utils/error-utils";
import axios, {AxiosError} from "axios";
import {AppStoreType} from "../../app/store";



export const getPacksTC = createAsyncThunk('packs/getPacks', async (param, {dispatch, getState, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const state = getState() as AppStoreType
            const {pageCount, page, sort, search, isMyPacks} = state.packs
            const res = await packsAPI.getPacks({pageCount, page, sort, search})
            console.log(res, 'res')
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {packs: res.data}
        } catch (error) {
            const e = error as Error | AxiosError
            if (axios.isAxiosError(e)) {
                const error = e.response?.data
                    ? (e.response.data as { error: string }).error
                    : e.message
                dispatch(setAppErrorAC({error: error}))
                return rejectWithValue({errors: [e.message], fieldsErrors: undefined})
            }
            handleServerNetworkError(e, dispatch)
        }
    }
)

export const addPacksTC = createAsyncThunk('packs/addPacks', async (newCardsPack: NewCardsPackType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await packsAPI.addPacks(newCardsPack)
            console.log(res, 'res')
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {newPack: res.data}
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
export const deletePacksTC = createAsyncThunk('packs/deletePacks', async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const state = thunkAPI.getState() as AppStoreType
            const {pageCount, page, sort, search, isMyPacks} = state.packs
            const res = await packsAPI.deletePacks(id)
            const res2 = await packsAPI.getPacks({pageCount, page, sort, search})
            console.log(res, 'res')
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id}
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
export const updatePacksTC = createAsyncThunk('packs/updatePacks', async (ChangedCardsPack: ChangedCardsPackType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const res = await packsAPI.updatePacks(ChangedCardsPack)
            console.log(res, 'res')
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {ChangedCardsPack}
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
    initialState: {} as CardPacksBase ,
    reducers: {
        setPage(state, action: PayloadAction<{page: number}>){
            state.page = action.payload.page
        },
        setPageCount(state, action: PayloadAction<{pageCount: number}>) {
            state.pageCount = action.payload.pageCount
        },
        showMyPacks(state, action: PayloadAction<{isMyPacks: boolean}>) {
            state.isMyPacks = action.payload.isMyPacks
            if(state.isMyPacks) {
                // state.myPacks = state.cardPacks.filter(p=>p.user_id === profile.userProfile?._id)
            }
        },
        searchPacks(state, action: PayloadAction<{search: string}>) {
            state.search = action.payload.search
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPacksTC.fulfilled, (state, action) => {
                if (action.payload) return action.payload.packs

            }
        )
        builder.addCase(addPacksTC.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log({...action.payload.newPack.newCardsPack}, 'render')
                    state.cardPacks.unshift({...action.payload.newPack.newCardsPack})
                }

            }
        )
        builder.addCase(deletePacksTC.fulfilled, (state, action) => {
                const index = state.cardPacks.findIndex(p => p._id === action.payload!.id)
                if (index > -1) {
                    state.cardPacks.splice(index, 1)
                }
            }
        )
        builder.addCase(updatePacksTC.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.cardPacks.findIndex(p => p._id === action.payload!.ChangedCardsPack._id)
                    state.cardPacks[index].name = action.payload.ChangedCardsPack.name
                }
            }
        )
    }

})


export const packsReducer = slice.reducer
export const {
    setPage, setPageCount, showMyPacks, searchPacks
} = slice.actions