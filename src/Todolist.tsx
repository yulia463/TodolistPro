import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckBox: (taskId: string, newIsDone: boolean) => void

}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)
    const [buttonName, setButtonName] = useState("all")

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError(true)
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
            props.changeFilter("all")
            setButtonName("all")
        }
    const onActiveClickHandler = () => {
            props.changeFilter("active")
            setButtonName("active")
        }
    const onCompletedClickHandler = () => {
            props.changeFilter("completed")
            setButtonName("completed")
        }

    const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>,id:string) => {
        props.changeCheckBox(id, e.currentTarget.checked)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? s.error : " "}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>Title is reqired</div>}
           </div>
             <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    // const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeCheckBox(t.id, e.currentTarget.checked)
                    // }
                    return <li key={t.id} className={ t.isDone ?s.isDoneStyle:'' }>
                        <input type="checkbox" checked={t.isDone} onChange={(e)=>{changeCheckBoxHandler(e, t.id)}}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
           </ul>
        <div>
            <button className={buttonName === "all" ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={buttonName === "active" ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={buttonName === "completed" ? s.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
