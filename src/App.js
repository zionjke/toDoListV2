import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {createTodoActionCreator, setTodoListAC} from "./redux/reducer";
import axios from 'axios'

class App extends React.Component {


    addTodoList = (title) => {
        // закидываем тудулисты в бекэнд..
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title},
            {
                withCredentials: true,
                headers: {'API-KEY': 'db79da77-d4ed-4333-9c43-3bf4d5e71c39'}
            })
            .then(response => {
                if(response.data.resultCode === 0) {
                    this.props.createTodolists(response.data.data.item)
                }
            });
    };

    componentDidMount() {
        // делаем запрос на сервер
        // дождатся ответа..
        // нам прийдут тудулисты и мы должны их отправить в store
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {withCredentials: true})
            .then(response => {
                console.log('TODOLIST RECEIVED');
                this.props.setTodolists(response.data)
            });
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



