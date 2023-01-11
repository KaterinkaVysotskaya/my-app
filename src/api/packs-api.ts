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

export type CardPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
export const packsAPI = {
    getPacks() {
        return instance.get<CardPacksResponseType>('cards/pack', {
           params: {
                // packName: data.packName,
                // min: data.min,
                // max: data.max,
                // sortPacks: data.sortPacks,
                // page: data.page,
                // pageCount: data.pageCount,
                // user_id: data.user_id
            }
        })
    }
}