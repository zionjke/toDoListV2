import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTask, changeTodoTask, deleteTodoList, deleteTodoTask, editTodoTitle, getTodoTasks} from "../redux/reducer";
import {TaskType, UpdateTaskType} from "../types/entities";
import {AppStateType} from "../redux/store";


type StateType = {
    filterValue:string
}

type OwnPropsType = {
    id:string,
    title:string,
    tasks:Array<TaskType>
}

type MapDispatchPropsType = {
    addTask:(title:string, id:string) =>void
    changeTodoTask:(task:TaskType,obj:UpdateTaskType,id:string)=>void
    editTodoTitle:(id:string,title:string)=>void
    deleteTodoTask:(taskId:string,id:string)=>void
    deleteTodoList:(id:string)=>void
    getTodoTasks:(id:string) => void
}

type PropsType = OwnPropsType & MapDispatchPropsType

class TodoList extends React.Component<PropsType, StateType> {

    state:StateType = {
        filterValue: "All",
    };


    addTask = (title:string) => {
        this.props.addTask(title,this.props.id)
    };

    changeFilter = (newFilterValue:string) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (task:TaskType,obj:UpdateTaskType) => {
        this.props.changeTodoTask(task,obj,this.props.id)
    };

    changeStatus = (task:TaskType, isDone:boolean) => {
        this.changeTask(task, {status: isDone ? 2 : 0});
    };

    changeTitle = (task:TaskType, newTitle:string) => {
        this.changeTask(task, {title: newTitle});
    };

    changeTodoTitle = (title:string) => {
        this.props.editTodoTitle(this.props.id,title)
    };


    deleteTask = (taskID:string) => {
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



export default connect<{},MapDispatchPropsType,OwnPropsType,AppStateType>(null, {getTodoTasks,addTask,deleteTodoList,editTodoTitle,deleteTodoTask,changeTodoTask})(TodoList)

