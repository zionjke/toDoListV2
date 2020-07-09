import React, {ChangeEvent} from 'react';

type StateType = {
    error:boolean,
    title:string
}

type OwnPropsType = {
    addItem: (newTitle:string) => void
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {

    state:StateType = {
        error: false,
        title: ""
    };

    onAddItemClick = () => {
        let newTitle = this.state.title.trim();
        if (newTitle === "") {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false,
                title: ""
            });
            this.props.addItem(newTitle)
        }

    };

    onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };

    render = () => {

        let classForInput = this.state.error ? "error" : "";

        return (
            <div className="todoList-header">
                <div className="todoList-newTaskForm">
                    <input
                           className={classForInput}
                           onChange={this.onTitleChanged}
                           onKeyPress={this.onKeyPress}
                           value={this.state.title}
                           type="text"
                           placeholder="New item name"
                    />
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default AddNewItemForm;

