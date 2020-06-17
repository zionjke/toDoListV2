import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {createTodoActionCreator, setTodoListAC} from "./redux/reducer";
import {api} from "./dal/api";

class App extends React.Component {

    addTodoList = (title) => {
        api.createTodolist(title).then(response => {
                    this.props.createTodolists(response.data.item)
            });
    };

    componentDidMount() {
        api.getTodolist().then(response => {this.props.setTodolists(response)});
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
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       createTodolists: (newTodolist) => {
           const action = createTodoActionCreator(newTodolist);
           dispatch(action)
       },
        setTodolists: (todolists) => {
           const action = setTodoListAC(todolists);
           dispatch(action)
        }
    }
};

const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);

export default ConnectedApp;



