export type InitialStateType = {

}
const initState = {

}
type ActionType = {
    type:''

}

export const signInReducer = (state: InitialStateType = initState, action: ActionType): InitialStateType => { // fix any
    switch (action.type) {
        case '': {
            return {...state}
        }


        default: return state
    }
}

export const loadingAC = (isLoading:boolean): ActionType => {
    return{
        type:''
    } as const
} // fix any