import React from 'react';
import TodoListTask from "./TodoListTask";
import {TaskType} from "../types/entities";

type OwnPropsType = {
    tasks: Array<TaskType>
    changeTitle:(task:TaskType,newTitle:string) => void
    changeStatus:(task:TaskType,isDone:boolean) => void
    deleteTask: (id:string) => void
}

class TodoListTasks extends React.Component<OwnPropsType> {
    render = () => {

        let taskEl = this.props.tasks.map ( task => <TodoListTask key={task.id}
                                                                  task={task}
                                                                  changeStatus={this.props.changeStatus}
                                                                  changeTitle={this.props.changeTitle}
                                                                  deleteTask={this.props.deleteTask}/>);

        return (
            <div className="todoList-tasks">
                {taskEl}
            </div>
        );
    }
}

export default TodoListTasks;

