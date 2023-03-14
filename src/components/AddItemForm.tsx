import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@mui/material";


type PropsType={
    callback: (title: string) => void

}
export const AddItemForm = (props:PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callback(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

  return(
      <div>
              <input value={title}
                     onChange={onChangeHandler}
                     onKeyPress={onKeyPressHandler}
                     className={error ? "error" : ""}
              />
          {/*<IconButton aria-label="addIcon" size="small" onClick={addTask}>+*/}
          {/*     <AddIcon fontSize="inherit" />*/}
          {/*</IconButton>*/}
          <button  onClick={addTask}>+</button>
              {error && <div className="error-message">{error}</div>}
      </div>
  )
}