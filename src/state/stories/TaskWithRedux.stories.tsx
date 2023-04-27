import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'

import {AddItemForm, AddItemFormPropsType} from "../../AddItemForm";
import {Button, IconButton} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import {AddBox} from "@mui/icons-material";
import {TaskWithRedux} from "../../TaskWithRedux";
import {ReduxStoreProviderDecoration} from "../ReduxStoreProviderDecoration";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {TaskType} from "../../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {id: 'jdksjksjd2e3', title: 'ji', isDone: true},
        todolistId: 'todolistId1'
    },
    decorators: [ReduxStoreProviderDecoration]
};



export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux task={task} todolistId={'todolistId1'}/>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    render: () => <TaskCopy />

};

