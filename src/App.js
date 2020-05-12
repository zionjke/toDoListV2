import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";

class App extends React.Component {

    state = {
        todolists: []
    }

    newTodoId = 0;


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
                if (tl.id >= this.newTaskId) {
                    this.newTaskId = tl.id +1
                }
            })
        });
    };

    addTodoList = (title) => {
        let newTodolist = {
            id: this.newTodoId,
            title: title
        };
        this.newTodoId++;
        let newTodolists = [...this.state.todolists, newTodolist];
        this.setState({
            todolists: newTodolists
        },() => { this.saveState()})
    };

    componentDidMount() {
        this.restoreState()
    };

    render = () => {

        const todolists = this.state.todolists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title}/>)

        return (
            <div>
                <AddNewItemForm addItem={this.addTodoList}/>
                <div className="App">
                    <div className="todoList">
                        {todolists}
                    </div>
                </div>
            </div>

        );
    }
}

export default App;

