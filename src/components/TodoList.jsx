import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";

class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };

    newTaskId = 0;

    // saveState = () => {
    //     //переводим объект в строку
    //     let  stateAString = JSON.stringify(this.state);
    //     //сохраняем нашу строку в localStorage под ключом "state"
    //     localStorage.setItem("tasks-state" + this.props.id, stateAString);
    // };

    // restoreState = () => {
    //     //объявляем наш стейт стартовый
    //     let state = this.state
    //     let stateAsString = localStorage.getItem("tasks-state" + this.props.id);
    //     if (stateAsString !== null) {
    //         state = JSON.parse(stateAsString);
    //     }
    //     this.setState(state, () => {
    //         this.state.tasks.forEach(t => {
    //             if (t.id >= this.newTaskId) {
    //                 this.newTaskId = t.id +1
    //             }
    //         })
    //     });
    // };

    addTask = (newText) => {
        let newTask = {
            id: this.newTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.props.addTask(this.props.id,newTask)
        // this.newTaskId++;
        // let newTasks = [...this.state.tasks, newTask];
        // this.setState( {
        //     tasks: newTasks
        // }, () => { this.saveState();});

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
        let newTasks = this.props.tasks.map(t => {
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


    deleteTask = (taskID) => {
        let newTasks = this.state.tasks.filter(t => t.id !== taskID);
        this.setState({
            tasks: newTasks
        }, () => {this.saveState()})
    }

    componentDidMount() {
        this.restoreState();
    }

    render = () => {

        let filteredTask = this.props.tasks.filter(t => {
            if (this.state.filterValue === "All") {
                return true;
            }
            if (this.state.filterValue === "Active") {
                return t.isDone === false;
            }
            if (this.state.filterValue === "Completed") {
                return t.isDone === true;
            }
        })

        return (
            <div className="todoList">
                    <TodoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask} />
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   tasks={filteredTask}
                                   deleteTask={this.deleteTask}/>
                    <TodoListFooter changeFilter={this.changeFilter}
                                    filterValue={this.state.filterValue} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todolistId,newTask) => {
            const action = {
                type: 'CREATE_TASK',
                todolistId,
                newTask
            }
            dispatch(action)
        },

    }
}

export default connect(null,mapDispatchToProps)(TodoList)

