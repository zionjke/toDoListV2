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
        this.props.addTask(newText, this.props.id)
        // this.newTaskId++;
        // let newTasks = [...this.state.tasks, newTask];
        // this.setState( {
        //     tasks: newTasks
        // }, () => { this.saveState();});

    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeStatus = (taskId, isDone) => {
        this.props.changeTask(taskId, {isDone: isDone},this.props.id);
    };

    changeTitle = (taskId, newTitle) => {
        this.props.changeTask(taskId, {title: newTitle},this.props.id);
    };

    // changeTask = (taskId,obj,todolisId) => {
    //     this.props.changeTask(taskId,obj,todolisId)
    // };


    deleteTask = (taskID) => {
        this.props.deleteTask(taskID,this.props.id)
    };

    componentDidMount() {

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
        });

        return (
            <div className="todoList">
                <TodoListTitle title={this.props.title}
                               id={this.props.id}/>
                <AddNewItemForm addItem={this.addTask}/>
                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               tasks={filteredTask}
                               deleteTask={this.deleteTask}/>
                <TodoListFooter changeFilter={this.changeFilter}
                                filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newText, todolistId) => {
            const action = {
                type: 'CREATE_TASK',
                newText: newText,
                todolistId: todolistId
            };
            dispatch(action)
        },
        changeTask: (taskId, obj,todolistId) => {
            const action = {
                type: 'CHANGE_TASK',
                taskId: taskId,
                obj: obj,
                todolistId: todolistId
            };
            dispatch(action)
        },
        deleteTask: (taskId,todolistId) => {
            const action = {
                type: 'DELETE_TASK',
                taskId: taskId,
                todolistId: todolistId
            };
            dispatch(action)
        }
    }
};

export default connect(null, mapDispatchToProps)(TodoList)

