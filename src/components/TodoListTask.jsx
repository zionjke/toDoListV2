import React from 'react';

class TodoListTask extends React.Component {
    state = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({
            isEditMode: true
        })
    };

    deactivatedEditMode = () => {
        this.setState({
            isEditMode: false
        })
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    };

    onIsTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };

    onIsDeleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };

    render = () => {

        let isStatus = this.props.task.status === 2
        let classForTask = isStatus ? "todoList-task done" : "todoList-task";

        return (
            <div className={classForTask}>

                <input
                    type="checkbox"
                    checked={isStatus }
                    onChange={this.onIsDoneChanged}
                />

                {this.state.isEditMode
                    ? <input value={this.props.task.title}
                             autoFocus={true}
                             onBlur={this.deactivatedEditMode}
                             onChange={this.onIsTitleChanged}/>
                    : <span onClick={this.activatedEditMode}>
                            {this.props.task.id}: {this.props.task.title}
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

