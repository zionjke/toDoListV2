import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {createTodoList,getTodoLists } from "./redux/reducer";

class App extends React.Component {

    addTodoList = (title) => {
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


const mapStateToProps = (state) => {
    return {
        todolists: state.todolist.todolists
    }
};



const ConnectedApp = connect(mapStateToProps,{createTodoList,getTodoLists})(App);

export default ConnectedApp;



