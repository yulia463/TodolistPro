import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import {combineReducers, legacy_createStore,AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export type AppDispatchType = ThunkDispatch <AppRootStateType,any,AnyAction>

export const useAppDispatch =()=>useDispatch<AppDispatchType>()

// непосредственно создаём store
export const store = legacy_createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
