import {TasksStateType} from '../App';
import {TaskType} from '../Todolist';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    |RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)}
        case 'ADD-TASK':
            let newTask: TaskType = {id: '0', title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.currentIsDone} : el)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.currentTitle} : el)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}

        case 'REMOVE-TODOLIST':
            // const copyState = {...state}
            // delete  copyState[action.id]
            // return copyState
            const {[action.id]:[],...rest}={...state}
            return rest
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const
}

export const changeTaskStatusAC = (taskId: string, currentIsDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, currentIsDone, todolistId}} as const
}

export const changeTaskTitleAC = (taskId: string, currentTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, currentTitle, todolistId}} as const
}


