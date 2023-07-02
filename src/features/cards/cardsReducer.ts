import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppErrorAC, setAppStatusAC} from "../../app/appReducer";
import {handleServerNetworkError} from "../../common/utils/error-utils";
import axios, {AxiosError} from "axios";
import {AppStoreType} from "../../app/store";
import {AddCardType, cardsAPI, CardsBaseType, CardType, ChangedCardType, GetCardsParamType} from "../../api/cards-api";


export const getCardsTC = createAsyncThunk('cards/getCards', async (param: GetCardsParamType, {dispatch, getState, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await cardsAPI.getCards({cardsPack_id: param.cardsPack_id })
            console.log(res, 'res getCards')
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {cards: res.data}
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

export const addCardTC = createAsyncThunk('cards/addCards', async (AddCard: AddCardType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await cardsAPI.addCard(AddCard )
            console.log(res, 'res')
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {newCard: res.data}
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
export const deleteCardTC = createAsyncThunk('cards/deleteCard', async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const state = thunkAPI.getState() as AppStoreType
            const res = await cardsAPI.deleteCard(id)

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
export const updateCardTC = createAsyncThunk('cards/updateCards', async (changedCard: ChangedCardType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const res = await cardsAPI.updateCard(changedCard)
            console.log(res, 'res')
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {updtedCard: res.data}
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
    name: 'cards',
    initialState: {} as CardsBaseType ,
    reducers: {
        searchCards(state, action: PayloadAction<{search?: string,}>) {
            state.search = action.payload.search
        },
        setPack_ID(state, action: PayloadAction<{statePack_id: string}>) {
            state.statePack_id = action.payload.statePack_id
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCardsTC.fulfilled, (state, action) => {
                if (action.payload)
                    return action.payload.cards
            console.log('action.payload.packs' , action.payload!.cards)
            }
        )
        builder.addCase(addCardTC.fulfilled, (state, action) => {
                if (action.payload)
                    state.cards.unshift({...action.payload.newCard})

            }
        )
        builder.addCase(deleteCardTC.fulfilled, (state, action) => {
                const index = state.cards.findIndex(c => c._id === action.payload!.id)
                if (index > -1) {
                    state.cards.splice(index, 1)
                }
            }
        )
        builder.addCase(updateCardTC.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.cards.findIndex(c => c._id === action.payload!.updtedCard._id)
                    state.cards[index] = action.payload.updtedCard
                }
            }
        )

    }

})


export const cardsReducer = slice.reducer
export const { searchCards, setPack_ID
} = slice.actions