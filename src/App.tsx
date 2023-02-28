import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'}
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    function removeTask(todoListID: string, taskId: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskId)})
    }

    function addTask(todoListId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
    }

    function changeStatus(todolistsID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistsID]: tasks[todolistsID].map(el => el.id === taskId ? {...el} : el)})
    }

    function changeFilter(todoListID: string, valueFilter: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter: valueFilter} : el))
    }

    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(el=>el.id !==todoListId))
        delete tasks[todoListId]
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id]?.filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id]?.filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        title={el.title}
                        todoListID={el.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
