import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number // количество колод

    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean

    error?: string
}
export type RegisterParamsType = {
    email: string
    password: string
}
export type RegisterResponseType = {
    addedUser: ResponseType
    error?: string
}
export type UpdateMeParamsType = {
    name: string
    avatar: File  // url or base64
}
export type UpdateMeResponseType = {
    updatedUser: ResponseType
    error?: string
}

type ForgotParamsType = {
    email: string
    from: string
    message: string
}
type BaseResponseType = {
    info: string
    error: string
}
type SetNewPasswordParamsType = {
    password: string
    resetPasswordToken: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data)
    },
    logout() {
        return instance.delete<BaseResponseType>('auth/me')
    },
    me() {
        return instance.post<ResponseType>('auth/me', {})
    },
    updateMe(data: UpdateMeParamsType) {
        const formData: FormData = new FormData()

        formData.append('image', data.avatar)

        return instance.put<FormData, AxiosResponse<UpdateMeResponseType>>('auth/me', formData, {
            headers: {
                'Content-Type': 'form/multipart'
            }
        })
    },
    register(data: RegisterParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<RegisterResponseType>>('auth/register', data)
    },
    forgot(data: ForgotParamsType) {
        return instance.post<BaseResponseType>('auth/forgot', data)
    },
    setNewPassword(data: SetNewPasswordParamsType) {
        return instance.post<BaseResponseType>('auth/set-new-password', data)
    },

}
