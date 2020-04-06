import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        return (
            <div className="todoList-tasks">
                <TodoListTask/>
                <TodoListTask/>
                <TodoListTask/>
                <TodoListTask/>
            </div>
        );
    }
}

export default TodoListTasks;

