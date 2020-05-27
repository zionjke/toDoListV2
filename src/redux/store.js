import {createStore} from "redux";

const initialState = {
    todolists: [
        {id: 1, title: "REACT", tasks: [{id: 0, title: "css"}]},
        {id: 2, title: "REDUX", tasks: [{id: 0, title: "css"}, {id: 1, title: "js"}]},
        {id: 3, title: "JS", tasks: [{id: 0, title: "css"}, {id: 1, title: "js"}, {id: 2, title: "react"}]},
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TODOLIST':
            return {...state, todolists: [...state.todolists, action.newTodolist]}
        case 'CREATE_TASK':
            return {...state, todolists: state.todolists.map(todo => {
                if (todo.id !== action.todolistId ) {
                    return todo
                } else {
                    return  {...todo,tasks: [...todo.tasks, action.newTask]}
                }
                } )}

        case 'CHANGE_TASK':
            return {
                ...state,todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return { ...todo,tasks: todo.tasks.map(task => {
                            if (task.id !== action.taskId) {
                                return task
                            } else {
                                return {...task, ...action.obj}
                            }
                            })}
                    }
                })
            }
    }
    return state;
}

const store = createStore(reducer);

export default store