export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-REQUEST-STATUS':
            return {...state, status: action.status}
        case 'SET-ERROR-STATUS':
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setRequestStatusAC = (status: RequestStatusType) => ({type: 'SET-REQUEST-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR-STATUS', error} as const)

export type ActionsType =
      setRequestStatusType
    | setErrorStatusACType

export type setRequestStatusType = ReturnType<typeof setRequestStatusAC>
export type setErrorStatusACType = ReturnType<typeof setErrorAC>
