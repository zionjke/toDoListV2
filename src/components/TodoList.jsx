import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {changeTaskActionCreator, createTaskActionCreator, deleteTaskActionCreator, setTaskAC} from "../redux/reducer";
import axios from "axios";

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
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newText},
            {
                withCredentials: true,
                headers: {'API-KEY': 'db79da77-d4ed-4333-9c43-3bf4d5e71c39'}
            })
            .then(res => {
                if(res.data.resultCode === 0) {
                    this.props.addTask(res.data.data.item ,this.props.id)
                }
            });
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

    deleteTask = (taskID) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskID}`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'db79da77-d4ed-4333-9c43-3bf4d5e71c39'}
            })
            .then(res => {
                if(res.data.resultCode === 0) {
                    this.props.deleteTask(taskID,this.props.id)
                }
            });

    };



    componentDidMount() {
        this.restoreState()
    };

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {withCredentials: true})
            .then(res => {
                if(!res.data.error) {
                    this.props.setTasks(this.props.id,res.data.items)
                }
            });
    }

    render = () => {

        let {tasks = []} = this.props

        let filteredTask = tasks.filter(t => {
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
        addTask: (newTask, todolistId) => {
            const action = createTaskActionCreator(newTask,todolistId)
            dispatch(action)
        },
        changeTask: (taskId, obj,todolistId) => {
            const action = changeTaskActionCreator(taskId,obj,todolistId)
            dispatch(action)
        },
        deleteTask: (taskId,todolistId) => {
            const action = deleteTaskActionCreator(taskId,todolistId)
            dispatch(action)
        },
        setTasks: (todolistId,task) =>  {
            const action = setTaskAC(todolistId,task);
            dispatch(action)
        }
    }
};

export default connect(null, mapDispatchToProps)(TodoList)

