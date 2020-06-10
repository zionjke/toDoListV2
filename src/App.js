import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {createTodoActionCreator, setTodoListAC} from "./redux/reducer";
import axios from 'axios'

class App extends React.Component {


    addTodoList = (title) => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title},
            {
                withCredentials: true,
                headers: {'API-KEY': 'db79da77-d4ed-4333-9c43-3bf4d5e71c39'}
            })
            .then(res => {
                if(res.data.resultCode === 0) {
                    this.props.createTodolists(res.data.data.item)
                }
            });
    };

    componentDidMount() {
        this.restoreState()
    };

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {withCredentials: true})
            .then(res => {
                this.props.setTodolists(res.data)
            });
    }

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
           const action = createTodoActionCreator(newTodolist)
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

// export default App;

