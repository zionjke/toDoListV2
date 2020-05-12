import React from 'react';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ""
    }

    onAddItemClick = () => {
        let newTitle = this.state.title.trim()
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

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    }

    render = () => {

        let classForInput = this.state.error ? "error" : ""

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

