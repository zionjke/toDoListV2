import React from 'react';
import {connect} from "react-redux";
import {deleteTodoActionCreator} from "../redux/reducer";
import axios from "axios";

class TodoListTitle extends React.Component {

    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'db79da77-d4ed-4333-9c43-3bf4d5e71c39'}
            })
            .then(res => {
                this.props.deleteTodo(this.props.id)
            });
    }


    render = () => {
        return (
            <h3 className="todoList-header__title">
                {this.props.title}
                <button onClick={this.deleteTodolist} className="btn_del">
                    X
                </button>
            </h3>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodo: (todolistId) => {
            const action = deleteTodoActionCreator(todolistId)
            dispatch(action)
        }
    }
};

export default connect(null, mapDispatchToProps)(TodoListTitle)


