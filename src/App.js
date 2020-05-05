import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";


class App extends React.Component {



    state = {
        tasks: [
            // {id: 0, title: "JS", isDone: true, priority: "medium"},
            // {id: 1, title: "HTML", isDone: true, priority: "low"},
            // {id: 2, title: "CSS", isDone: true, priority: "low"},
            // {id: 3, title: "ReactJS", isDone: false, priority: "high"}
        ],
        filterValue: "All",
        newTaskId: 0
    };

    newTaskId = 0;



    saveState = () => {
        //переводим объект в строку
        let  stateAString = JSON.stringify(this.state);
        //сохраняем нашу строку в localStorage под ключом "state"
        localStorage.setItem("state", stateAString);
    };

    restoreState = () => {
        //объявляем наш стейт стартовый
        let state = {
            tasks: [],
            filterValue: "All",
            newTaskId: 0
        };
        let stateAsString = localStorage.getItem("state");
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.newTaskId) {
                    this.newTaskId = t.id +1
                }
            })
        });
    };

    addTask = (newText) => {
        let newTask = {
            id: this.newTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.newTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks
        }, () => { this.saveState();});

    };

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        });
    };

    changeStatus = (taskId, isDone) => {
        this.changedTask (taskId, {isDone: isDone});
    };

    changeTitle = (taskId, newTitle) => {
        this.changedTask(taskId, {title: newTitle});
    };

    changedTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t; //возвращаем таску без изменения, если это не та таска, которую нужно поменять
            }
            else {
                // делаем копию таски и сразу перезатираем в ней сво-во isDone новым значением
                return {...t, ...obj};
            }
        });
        // а уже получив новый массив, изменяем этот массив в state с помощью setState
        this.setState( {
            tasks: newTasks
        }, () => { this.saveState();});
    };

    componentDidMount() {
        this.restoreState();
    }

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   tasks={this.state.tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.isDone === false;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.isDone === true;
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

