import React from 'react';
import {connect} from "react-redux";
import {deleteTodoActionCreator} from "../redux/reducer";
import axios from "axios";

class TodoListTitle extends React.Component {


    render = () => {
        return (
            <h3 className="todoList-header__title">
                {this.props.title}
                <button onClick={this.props.deleteTodolist} className="btn_del">
                    X
                </button>
            </h3>
        );
    }
}

export default TodoListTitle


