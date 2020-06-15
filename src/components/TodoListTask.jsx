import React from 'react';

class TodoListTask extends React.Component {
    state = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deactivatedEditMode = (e) => {
        this.props.changeTitle(this.props.task, e.currentTarget.value)
        this.setState({isEditMode: false})
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    };



    onIsDeleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };

    render = () => {

        let isDone = this.props.task.status === 2
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

                <span>
                    {this.props.task.priority}
                    </span>
                <button onClick={this.onIsDeleteTask}>x</button>
            </div>
        );
    }


}


export default TodoListTask;

