import React, {ChangeEvent} from 'react';
import {TaskType, UpdateTaskType} from "../types/entities";


type StateType = {
    isEditMode:boolean
}

type OwnPropsType = {
    task:TaskType
    changeTitle:(task:TaskType,newTitle:string) => void
    changeStatus:(task:TaskType,isDone:boolean) => void
    deleteTask: (id:string) => void
}

class TodoListTask extends React.Component<OwnPropsType,StateType> {
    state:StateType = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deactivatedEditMode = (e:React.FocusEvent<HTMLInputElement>) => {
        this.props.changeTitle(this.props.task, e.currentTarget.value);
        this.setState({isEditMode: false})
    };

    onIsDoneChanged = (e:ChangeEvent<HTMLInputElement>) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    };



    onIsDeleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };

    render = () => {

        let isDone = this.props.task.status === 2;
        let classForTask = isDone ? "todoList-task done" : "todoList-task";

        return (
            <div className={classForTask}>

                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={this.onIsDoneChanged}
                />

                {this.state.isEditMode
                    ? <input defaultValue={this.props.task.title}
                             autoFocus={true}
                             onBlur={this.deactivatedEditMode}
                            />
                    : <span onClick={this.activatedEditMode}>
                             {this.props.task.title}
                    </span>
                }
                <button onClick={this.onIsDeleteTask}>x</button>
            </div>
        );
    }


}


export default TodoListTask;

