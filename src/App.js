import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";

class App extends React.Component {
    constructor(props) {
        super(props);
    };

    newTaskTitleRef = React.createRef();

    state = {
        tasks : [
            {title: "JS", isDone: true, priority: "priority:low"},
            {title: "React",isDone: false, priority: "priority:medium"},
            {title: "Angular",isDone: false, priority: "priority:high"}
        ],
        filterValue : "All"
    };

    onAddTaskClick = () => {
        let newTaskName = this.newTaskTitleRef.current.value;
        let newTask = {
            title: newTaskName,
            isDone: true,
            priority: "high"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks:newTasks
        })
    };


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader onAddTaskClick={this.onAddTaskClick} newTaskTitleRef={this.newTaskTitleRef}/>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

