import React, {ChangeEvent, useState} from "react";

export type PropsSpan = {
    oldTitle: string
    callback: (title: string) => void
}
export const EditableSpan = (props: PropsSpan) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        addTask()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTask = () => {
     props.callback(newTitle)
    }

    return (
        edit
            ? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};