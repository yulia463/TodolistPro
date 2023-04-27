import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from './EditableSpan'
import {TaskType} from './Todolist'
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const TaskWithRedux = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = () => {
        const action = removeTaskAC(props.task.id, props.todolistId);
        dispatch(action);
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        const action = changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId);
        dispatch(action);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        const action = changeTaskTitleAC(props.task.id, newValue, props.todolistId)
        dispatch(action)
    }, [props.task.id, props.todolistId]);



    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})