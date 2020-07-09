import React from 'react';

type StateType = {
    isEditMode:boolean
}

type OwnPropsType = {
    title:string
    editTitle:(title:string) => void
    deleteTodolist:() => void
}

class TodoListTitle extends React.Component<OwnPropsType,StateType> {

    state:StateType = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deactivatedEditMode = (e:React.FocusEvent<HTMLInputElement>) => {
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


