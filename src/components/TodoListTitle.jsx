import React from 'react';
import {connect} from "react-redux";
import {deleteTodoActionCreator} from "../redux/reducer";
import axios from "axios";

class TodoListTitle extends React.Component {

    state = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deactivatedEditMode = (e) => {
        this.props.editTitle(e.currentTarget.value);
        this.setState({isEditMode: false})
    };


    render = () => {
        return (
            <div className="todoList-header__title">
                {this.state.isEditMode
                    ? <input defaultValue={this.props.title}
                             autoFocus={true}
                             onBlur={this.deactivatedEditMode}
                    />
                    : <span onClick={this.activatedEditMode}>
                             {this.props.title}
                    </span>
                }
                <button onClick={this.props.deleteTodolist} className="btn_del">
                    X
                </button>
            </div>
        );
    }
}

export default TodoListTitle


