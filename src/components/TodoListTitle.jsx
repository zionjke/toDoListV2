import React from 'react';
import {connect} from "react-redux";
import {deleteTodoActionCreator} from "../redux/reducer";

class TodoListTitle extends React.Component {


    render = () => {


        return (
            <h3 className="todoList-header__title">
                {this.props.title}
                <button onClick={ () => {this.props.deleteTodo(this.props.id)}} className="btn_del">
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


