import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
    };

    state = {
        tasks : [
            {title: "JS", isDone: true, priority: "priority:low"},
            {title: "React",isDone: false, priority: "priority:medium"},
            {title: "Angular",isDone: false, priority: "priority:high"}
        ],
        filterValue : "All"
    };

    addTask = (newTitle) => {
        // let newTask = {
        //     title: newTitle,
        //     isDone: true,
        //     priority: "priority:low"
        // };
        // let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks:[...this.state.tasks, {title:newTitle,isDone:true,priority:"priority:low"}]
        })
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue:newFilterValue
        })
    };

    changeStatus = (task, isDone) => {
            let newTasks = this.state.tasks.map(t => {
                if(t === task) {
                    return {...t,isDone: isDone}
                }
                return t;
            })
            this.setState({tasks:newTasks})
    }


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks tasks={this.state.tasks.filter(
                        t => {
                            switch (this.state.filterValue) {
                                case "Active": return t.isDone === false
                                case "Completed": return t.isDone === true
                                case "All": return true
                                default: return true;
                            }
                        }
                    )} changeStatus={this.changeStatus}/>
                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
                </div>
            </div>
        );
    }
}

export default App;

