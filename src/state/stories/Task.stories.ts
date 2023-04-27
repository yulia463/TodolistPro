import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../../Task";
import {action} from '@storybook/addon-actions'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {

    },
    argTypes: {
        changeTaskStatus: {
            action: 'clicked'
        },
        changeTaskTitle: {
            action: 'clicked'
        },
        removeTask: {
            action: 'clicked'
        }
    }

};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDone: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: 'asda4984-845', title: 'JS', isDone: false},
    },
}

export const TaskIsDone: Story = {
    args: {
        task: {id: 'asda4984-846', title: 'HTML', isDone: true},
    },
}