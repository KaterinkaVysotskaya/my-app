import {instance} from "./instance";
import {AxiosResponse} from "axios";
import {LoginParamsType, RegisterResponseType} from "./auth-api";


type GetPackParamType = {
    packName?: string // не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks?: number // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
    user_id?: string // чьи колоды
}
export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string// папка
    cardsCount: number
    grade: number// средняя оценка карточек
    shots: number // количество попыток
    deckCover: 'url | base64'
    rating: number // лайки
    type: string // ещё будет "folder" (папка)
    created: string
    updated: string
    more_id: string
    __v: number
}
type  SettingsType = {
    min?: number
    max?: number
    page?: number
    pageCount?: number
    sort?: string
    search?: string
    isMyPacks?: boolean
    myPacks?: PackType[]
}
export type CardPacksBase  = {
    cardPacks: PackType[]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
} & SettingsType

export type NewCardsPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: "url or base64"
    private?: boolean
    type?: string
}
export type ChangedCardsPackType = {
    _id: string
    name: string
}
export type BaseResponseType = {
    newCardsPack: PackType
    token: string
    tokenDeathTime: number
}
export type getPacksPatamType = {
    search?: string
    min?: number
    max?: number
    sort?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export const packsAPI = {
    getPacks(data: getPacksPatamType) {
        return instance.get<CardPacksBase>('cards/pack', {
           params: {
                packName: data.search,
                min: data.min,
                max: data.max,
                sortPacks: data.sort,
                page: data.page,
                pageCount: data.pageCount,
                user_id: data.user_id
            }
        })
    },
    addPacks(cardsPack: NewCardsPackType) {
        return instance.post<NewCardsPackType, AxiosResponse<BaseResponseType>>('/cards/pack', {cardsPack: cardsPack})
    },
    deletePacks(id: string) {
        return instance.delete(`/cards/pack/`, {
            params: {
                id: id
            }
        })
    },
    updatePacks(ChangedCardsPack: ChangedCardsPackType) {
        return instance.put('/cards/pack',{cardsPack: ChangedCardsPack})
    }
}