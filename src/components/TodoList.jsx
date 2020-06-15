import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {
    changeTaskActionCreator,
    createTaskActionCreator,
    deleteTaskActionCreator,
    deleteTodoActionCreator,
    setTaskAC
} from "../redux/reducer";
import axios from "axios";

class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };


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

    changeTask = (task,obj) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            {
                ...task,
                ...obj
            },
            {
                withCredentials: true,
                headers: {'API-KEY': 'db79da77-d4ed-4333-9c43-3bf4d5e71c39'}
            })
            .then(res => {
                if(res.data.resultCode === 0) {
                    this.props.updateTask(task.id,obj,this.props.id)
                }
            });


    }

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone ? 2 : 0});
    };

    changeTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle});
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

    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'db79da77-d4ed-4333-9c43-3bf4d5e71c39'}
            })
            .then( () => {
                this.props.deleteTodo(this.props.id)
            });
    };


    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {withCredentials: true})
            .then(res => {
                if(!res.data.error) {
                    this.props.setTasks(this.props.id,res.data.items)
                }
            });
    };


    render = () => {

        let {tasks = []} = this.props;

        let filteredTask = tasks.filter(task => {
            if (this.state.filterValue === "All") {
                return true;
            }
            if (this.state.filterValue === "Active") {
                return task.status !== 2;
            }
            if (this.state.filterValue === "Completed") {
                return task.status === 2;
            }
        });

        return (
            <div className="todoList">
                <TodoListTitle title={this.props.title}
                               deleteTodolist={this.deleteTodolist}/>
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
            const action = createTaskActionCreator(newTask,todolistId);
            dispatch(action)
        },
        updateTask: (taskId, obj,todolistId) => {
            const action = changeTaskActionCreator(taskId,obj,todolistId);
            dispatch(action)
        },
        deleteTask: (taskId,todolistId) => {
            const action = deleteTaskActionCreator(taskId,todolistId);
            dispatch(action)
        },
        setTasks: (todolistId,task) =>  {
            const action = setTaskAC(todolistId,task);
            dispatch(action)
        },
        deleteTodo: (todolistId) => {
            const action = deleteTodoActionCreator(todolistId);
            dispatch(action)
        }
    }
};

export default connect(null, mapDispatchToProps)(TodoList)

