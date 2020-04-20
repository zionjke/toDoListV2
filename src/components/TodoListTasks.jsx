import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let taskEl = this.props.tasks.map ( task => <TodoListTask task={task} changeStatus={this.props.changeStatus}/>);

        return (
            <div className="todoList-tasks">
                {taskEl}
            </div>
        );
    }
}

export default TodoListTasks;

