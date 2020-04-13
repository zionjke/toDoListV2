import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";

class App extends React.Component {
    constructor(props) {
        super(props);
        setTimeout(()=>{
            let newTask = {
                title: "PHP",isDone: false, priority: "priority:low"
            };
                let newTasks = [...this.state.tasks,newTask];
                this.setState({
                    tasks:newTasks
                });

        },2000);
    }

    state = {
        tasks : [
            {title: "JS", isDone: true, priority: "priority:low"},
            {title: "React",isDone: false, priority: "priority:medium"},
            {title: "Angular",isDone: false, priority: "priority:high"}
        ],
        filterValue : "All"
    };




    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

