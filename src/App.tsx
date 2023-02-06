import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type ButtonNameType = "All" | "Active" | "Completed"

function App() {

    let [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false},
    ])

    const removeTask = (taskId: number) => {

        setTasks1(tasks1 = tasks1.filter(el => el.id !== taskId))
    }

    let[filterTask,setFilterTask]=useState<ButtonNameType>("All")


    const filteringTasks = (buttonName: ButtonNameType) => {
        setFilterTask(buttonName)
    }

    let filteredTasks = tasks1
    if (filterTask === "Active") {
        filteredTasks = tasks1.filter(el => el.isDone)
    }
    if (filterTask === "Completed") {
        filteredTasks = tasks1.filter(el => !el.isDone)
    }

 return (
    <div className="App">
        <Todolist
            title="What to learn"
            tasks={filteredTasks}
            removeTask={removeTask}
            filteringTasks={ filteringTasks}

        />
    </div>
);
}

export default App;
