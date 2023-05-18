import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTaskAC} from "./tasks-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks

export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try{
        const res = await authAPI.login(data)
        if(res.data.resultCode === 0){
           dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))

        }else{
            handleServerAppError(res.data,dispatch)
        }
    }catch (e){
        handleServerNetworkError((e as any).message,dispatch);
    }



}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
