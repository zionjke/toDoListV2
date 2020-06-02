import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";

class App extends React.Component {

    // state = {
    //     todolists: []
    // }

    newTodoId = 4;


    saveState = () => {
        //переводим объект в строку
        let  stateAString = JSON.stringify(this.state);
        //сохраняем нашу строку в localStorage под ключом "state"
        localStorage.setItem("todo-state", stateAString);
    };

    restoreState = () => {
        //объявляем наш стейт стартовый
        let state = this.state
        let stateAsString = localStorage.getItem("todo-state" );
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todolists.forEach(tl => {
                if (tl.id >= this.newTodoId) {
                    this.newTodoId = tl.id +1
                }
            })
        });
    };

    addTodoList = (title) => {
        let newTodolist = {
            id: this.newTodoId,
            title: title,
            tasks:[]
        };

        this.props.createTodolists(newTodolist)

        // this.newTodoId++;
        // let newTodolists = [...this.state.todolists, newTodolist];
        // this.setState({
        //     todolists: newTodolists
        // },() => { this.saveState()})
    };

    componentDidMount() {
        this.restoreState()
    };

    render = () => {

        const todolist = this.props.todolists.map(tl => <TodoList key={tl.id}
                                                                  id={tl.id}
                                                                  title={tl.title}
                                                                  tasks={tl.tasks}/>)

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
}

const mapDispatchToProps = (dispatch) => {
    return {
       createTodolists: (newTodolist) => {
           const action = {
               type: 'CREATE_TODOLIST',
               newTodolist:newTodolist
           }
           dispatch(action)
       }
    }
}

const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);

export default ConnectedApp;

// export default App;

