import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    CardPacksBase,
    ChangedCardsPackType,
    getPacksParamType,
    NewCardsPackType,
    packsAPI,
    PackType
} from "../../api/packs-api";
import {setAppErrorAC, setAppStatusAC} from "../../app/appReducer";
import {handleServerNetworkError} from "../../common/utils/error-utils";
import axios, {AxiosError} from "axios";
import {AppStoreType} from "../../app/store";


//todo: ts for params in getPacksTC

export const getPacksTC = createAsyncThunk('packs/getPacks', async (param: {},{dispatch, getState, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {

             const state = getState() as AppStoreType
            const {pageCount, page, sortPacks, packName, min, max} = state.packs
            const res = await packsAPI.getPacks({page, pageCount, packName, min, max, sortPacks })

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
        finally {
            dispatch(setAppStatusAC({status: 'idle'}))
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
        finally {
            thunkAPI.dispatch(setAppStatusAC({status: 'idle'}))
        }
    }
)
export const deletePacksTC = createAsyncThunk('packs/deletePacks', async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const state = thunkAPI.getState() as AppStoreType
            const res = await packsAPI.deletePacks(id)

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
        finally {
            thunkAPI.dispatch(setAppStatusAC({status: 'idle'}))
        }
    }
)
export const updatePacksTC = createAsyncThunk('packs/updatePacks', async (changedCardsPack: ChangedCardsPackType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const res = await packsAPI.updatePacks(changedCardsPack)
            console.log(res, 'res')
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {changedCardsPack}
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
        } finally {
            thunkAPI.dispatch(setAppStatusAC({status: 'idle'}))
        }
    }
)

const slice = createSlice({
    name: 'packs',
    initialState: {
        cardPacks: [],
        cardPacksTotalCount: 0, // количество колод
        maxCardsCount: 53,
        minCardsCount: 0,
        page: 1,// выбранная страница
        pageCount: 10,
        packName: '',
        min: 0,
        max: 53,
        sortPacks: '0updated'
    } as CardPacksBase,
    reducers: {
        showMyPacks(state, action: PayloadAction<{ isMyPacks: boolean }>) {
            state.isMyPacks = action.payload.isMyPacks
            if (state.isMyPacks) {
                // state.myPacks = state.cardPacks.filter(p=>p.user_id === profile.userProfile?._id)
            }
        },
        setSearchPacks(state, action: PayloadAction<{ search?: string, min?: number, max?: number,  }>) {
            state.packName = action.payload.search
            state.min = action.payload.min
            state.max = action.payload.max

        },
        sortByDate(state, action: PayloadAction<{ sortPacks: string }>) {
            state.sortPacks = action.payload.sortPacks
        },
        clearSettingsFilter(state) {
            state.packName = ''
            state.min = state.minCardsCount
            state.max = state.maxCardsCount
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPacksTC.fulfilled, (state, action) => {
                if (action.payload) {
                    state.cardPacks = action.payload.packs.cardPacks
                    state.cardPacksTotalCount = action.payload.packs.cardPacksTotalCount // количество колод
                    state.maxCardsCount = action.payload.packs.maxCardsCount
                    state.minCardsCount = action.payload.packs.minCardsCount
                    state.page = action.payload.packs.page// выбранная страница
                    state.pageCount = action.payload.packs.pageCount
                }

            }
        )
        builder.addCase(addPacksTC.fulfilled, (state, action) => {
                if (action.payload) {
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
                    const index = state.cardPacks.findIndex(p => p._id === action.payload!.changedCardsPack._id)
                    state.cardPacks[index].name = action.payload.changedCardsPack.name
                }
            }
        )
    }

})


export const packsReducer = slice.reducer
export const {
    setSearchPacks,
    clearSettingsFilter,
    showMyPacks,
    sortByDate
} = slice.actions