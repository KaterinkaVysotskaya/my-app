import {instance} from "./instance";
import {AxiosResponse} from "axios";


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
    name: string
    path: string// папка
    cardsCount: number
    grade: number// средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: string // ещё будет "folder" (папка)
    created: Date
    updated: Date
    __v: number
}

type CardPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
export const packsAPI = {
    getPacks() {
        return instance.get<CardPacksResponseType>('cards/pack')
    }
}