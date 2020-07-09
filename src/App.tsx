import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {createTodoList,getTodoLists } from "./redux/reducer";
import {AppStateType} from "./redux/store";
import {TodoType} from "./types/entities";


type MapStatePropsType = {
    todolists : Array<TodoType>
}

type MapDispatchPropsType = {
    getTodoLists: ()=> void
    createTodoList:(title:string)=>void
}


class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    addTodoList = (title:string) => {
        this.props.createTodoList(title)
    };

    componentDidMount() {
        this.props.getTodoLists()
    };



    render = () => {

        const todolist = this.props.todolists.map(todo => <TodoList key={todo.id}
                                                                  id={todo.id}
                                                                  title={todo.title}
                                                                  tasks={todo.tasks}/>);

        return (
            <div>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolist}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        todolists: state.todolist.todolists

    }
};



export  default connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps,{createTodoList,getTodoLists})(App);





