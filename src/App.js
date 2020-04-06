import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";

class App extends React.Component {
    tasks = [
        {title: "JS", isDone: true, priority: "priority:low"},
        {title: "React",isDone: false, priority: "priority:medium"},
        {title: "Angular",isDone: false, priority: "priority:high"}
    ];

    filterValue = "All";

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

