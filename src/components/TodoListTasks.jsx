import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let taskEl = this.props.tasks.map ( task => <TodoListTask key={task.id}
                                                                  task={task}
                                                                  changeStatus={this.props.changeStatus}
                                                                  changeTitle={this.props.changeTitle}
                                                                  deleteTask={this.props.deleteTask}/>);

        return (
            <div className="todoList-tasks">
                {taskEl}
            </div>
        );
    }
}

export default TodoListTasks;

