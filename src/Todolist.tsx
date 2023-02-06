import React, {useState} from 'react';
import {ButtonNameType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId:number) => void
    filteringTasks:(buttonName: ButtonNameType)=>void
}

export function Todolist(props: PropsType) {

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(el => {
                return <li key={el.id}>
                    <button onClick={() => {props.removeTask(el.id)}}>X
                    </button>
                    <input type="checkbox"
                           checked={el.isDone}/>
                    <span>{el.title}</span>

                </li>
            })}
        </ul>
        <div>
            <button onClick={()=>{props.filteringTasks("All")}}>All</button>
            <button onClick={()=>{props.filteringTasks("Active")}}>Active</button>
            <button onClick={()=>{props.filteringTasks("Completed")}}>Completed</button>
        </div>
    </div>
}
