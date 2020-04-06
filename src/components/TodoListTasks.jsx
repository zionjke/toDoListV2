import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        return (
            <div className="todoList-tasks">
                <TodoListTask title={"JS"} isDone={true}/>
                <TodoListTask title={"HTML"} isDone={true}/>
                <TodoListTask title={"CSS"} isDone={true}/>
                <TodoListTask title={"REACT"} isDone={false}/>
            </div>
        );
    }
}

export default TodoListTasks;

