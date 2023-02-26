import {instance} from "./instance";
import {AxiosResponse} from "axios";
import {BaseResponseType, CardPacksBase, ChangedCardsPackType, getPacksParamType, NewCardsPackType} from "./packs-api";

type GetCardsParamType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}
type BaseResponseCardType = CardType & {
    token: string
    tokenDeathTime: number
}
type SettingsType = {
    search?: string
    pack_ID?: string | null
}
export type CardsBaseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    packCreated: string
    packDeckCover: 'url | base64'
    packName: string
    packPrivate:boolean
    packUpdated: string
    token: string
    tokenDeathTime: number
} & SettingsType
export type AddCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: "url or base 64" // не обязателен
    questionImg?: "url or base 64" // не обязателен
    questionVideo?: "url or base 64" // не обязателен
    answerVideo?: "url or base 64" // не обязателен
    type?: string
}

export type ChangedCardType = {
    answer?: string
    question?: string
    cardsPack_id?: string
    grade?: number
    rating?: number
    shots?: number
    type?: string
    user_id?: string
    created?: string
    updated?: string
    __v?: number
    _id: string
}
export const cardsAPI = {
    getCards(data: GetCardsParamType) {
        return instance.get<CardsBaseType>('cards/card', {
            params: {
                cardQuestion: data.cardQuestion,
                cardAnswer: data.cardAnswer,
                cardsPack_id: data.cardsPack_id,
                min: data.min,
                max: data.max,
                sortCards:data.sortCards,
                page: data.page,
                pageCount: data.pageCount
            }
        })
    },
    addCard(card: AddCardType) {
        return instance.post<AddCardType, AxiosResponse<BaseResponseCardType>>('/cards/card', {card: card})
    },
    deleteCard(id: string) {
        return instance.delete<BaseResponseCardType>(`/cards/card/`, {
            params: {
                id: id
            }
        })
    },
    updateCard(changedCard: ChangedCardType) {
        return instance.put<BaseResponseCardType>('/cards/card',{card: changedCard})
    }
}