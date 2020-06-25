import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTask, changeTodoTask, deleteTodoList, deleteTodoTask, editTodoTitle, getTodoTasks} from "../redux/reducer";


class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };


    addTask = (title) => {
        this.props.addTask(title,this.props.id)
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (task,obj) => {
        this.props.changeTodoTask(task,obj,this.props.id)
    };

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone ? 2 : 0});
    };

    changeTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle});
    };

    changeTodoTitle = (title) => {
        this.props.editTodoTitle(this.props.id,title)
    };


    deleteTask = (taskID) => {
        this.props.deleteTodoTask(taskID,this.props.id)

    };

    deleteTodolist = () => {
        this.props.deleteTodoList(this.props.id)
    };


    componentDidMount() {
       this.props.getTodoTasks(this.props.id)
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
                               deleteTodolist={this.deleteTodolist}
                               editTitle={this.changeTodoTitle}
                              />
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



export default connect(null, {getTodoTasks,addTask,deleteTodoList,editTodoTitle,deleteTodoTask,changeTodoTask})(TodoList)

