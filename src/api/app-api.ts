import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type UserProfileType = {
    _id: string
    email: string
    name: string
    // avatar: string
    publicCardPacksCount: number // количество колод

    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean

    token: string
    tokenDeathTime: number
    __v: number
}
export type RegisterParamsType = {
    email: string
    password: string
}
export type RegisterResponseType = {
    addedUser: UserProfileType
    error?: string
}
export type UpdateMeParamsType = {
    name: string
    avatar: File | string // url or base64
}
export type UpdateMeResponseType = {
    updatedUser: UserProfileType
    error?: string
}

export type ForgotParamsType = {
    email: string
    from: string
    message: string
}
export type BaseResponseType = {
    info: string
    error: string
}
export type SetNewPasswordParamsType = {
    password: string
    resetPasswordToken: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<UserProfileType>>('auth/login', data)
    },
    logout() {
        return instance.delete<BaseResponseType>('auth/me')
    },
    me() {
        return instance.post<UserProfileType>('auth/me', {})
    },
    updateMe(data: UpdateMeParamsType) {
        const formData: FormData = new FormData()

        formData.append('image', data.avatar)

        return instance.put<UpdateMeParamsType, AxiosResponse<UpdateMeResponseType>>('auth/me', {name: data.name, avatar: formData}, {
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
