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
        this.props.changeTitle(this.props.task.id,e.currentTarget.value)
    };

    onIsDeleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }

    render = () => {

        let classForTask = this.props.task.isDone  ? "todoList-task done" : "todoList-task";

        return (
                <div className={classForTask}>

                    <input
                            type="checkbox"
                           checked={this.props.task.isDone}
                            onChange={this.onIsDoneChanged}
                    />

                    { this.state.isEditMode
                        ? <input value={this.props.task.title}
                                 autoFocus={true}
                                 onBlur={this.deactivatedEditMode}
                                 onChange={this.onIsTitleChanged}/>
                        : <span onClick={this.activatedEditMode}> {this.props.task.id}: {this.props.task.title} </span>
                    }

                    <span>
                         {this.props.task.priority}
                    </span>
                    <button onClick={this.onIsDeleteTask}>delete</button>
                </div>
        );
    }


}


export default TodoListTask;

