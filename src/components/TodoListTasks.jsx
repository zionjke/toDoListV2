import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let taskEl = this.props.tasks.map ( task => <TodoListTask title={task.title} isDone={task.isDone} priority={task.priority}/>);

        return (
            <div className="todoList-tasks">
                <TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone}/>
                <TodoListTask title={this.props.tasks[1].title} isDone={this.props.tasks[1].isDone}/>
                {taskEl}
            </div>
        );
    }
}

export default TodoListTasks;

