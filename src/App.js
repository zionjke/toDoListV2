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
            // {id:0, title: "JS", isDone: true, priority: "priority:low"},
            // {id:1, title: "React",isDone: false, priority: "priority:medium"},
            // {id:2, title: "Angular",isDone: false, priority: "priority:high"}
        ],
        filterValue : "All"
    };

    nextTaskId = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("state", stateAsString)
    }

    restoreState = () => {
        let state = {
            tasks:[],
            filterValue: "All"
        }
        let stateAsString = localStorage.getItem("state");
        if(stateAsString) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () =>{
            this.state.tasks.forEach(t=>{
                if(t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1
                }
            })
        })
    }

    componentDidMount() {
        this.restoreState();
    }

    addTask = (newTitle) => {
        this.setState({
            tasks:[...this.state.tasks, { id:this.nextTaskId,title:newTitle,isDone:false,priority:"priority:low" }]
        },this.saveState)
        this.nextTaskId++
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue:newFilterValue
        })
    };

    changeStatus = (taskId, isDone) => {
            this.changeTask(taskId, {isDone: isDone})
            // let newTasks = this.state.tasks.map(t => {
            //     if(t.id === taskId) {
            //         return {...t,isDone: isDone}
            //     }
            //     return t;
            // })
            // this.setState({tasks:newTasks})
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if(t.id === taskId) {
                return {...t,...obj}
            }
            return t;
        })
        this.setState({tasks:newTasks},this.saveState)
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId,{title:title})
        // let newTasks = this.state.tasks.map(t => {
        //     if(t.id === taskId) {
        //         return {...t,title: title}
        //     }
        //     return t;
        // })
        // this.setState({tasks:newTasks})
    };


    render = () => {

        let filteredTasks = this.state.tasks.filter(
            t => {
                switch (this.state.filterValue) {
                    case "Active": return t.isDone === false
                    case "Completed": return t.isDone === true
                    case "All": return true
                    default: return true;
                }
            }
        );

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks tasks={filteredTasks}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}/>
                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
                </div>
            </div>
        );
    }
}

export default App;

