import React from 'react';

class TodoListTask extends React.Component {
    render = () => {
        return (
                <div className="todoList-task">
                    <input type="checkbox" checked={true}/>
                    <span>CSS</span>
                </div>
        );
    }
}

export default TodoListTask;

