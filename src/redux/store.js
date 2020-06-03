import {createStore} from "redux";

const initialState = {
    todolists: [
        {id: 1, title: "REACT", tasks: [{id: 0, title: "JS", isDone: false, priority: "low"}]},
        {
            id: 2, title: "REDUX", tasks: [{id: 0, title: "JS", isDone: false, priority: "medium"},
                {id: 1, title: "REACT", isDone: false, priority: "high"}]
        },
        {id: 3, title: "JS", tasks: [{id: 0, title: "REDUX", isDone: false, priority: "high"}]},
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TODOLIST':
            let newTodolist = {
                id: (new Date()).getTime(),
                title: action.title,
                tasks: []
            };
            return {
                ...state, // делаем копию стейта
                todolists: [...state.todolists, newTodolist] // ложим в тудулисты копию старых тудулистов и новый который пришел нам через экшн
            };
        case 'CREATE_TASK':
            let newTask = {
                id: (new Date()).getTime(),
                title: action.newText,
                isDone: false,
                priority: "low"
            };
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                        if (todo.id !== action.todolistId) {
                            return todo
                        } else {
                            return {
                                ...todo,
                                tasks: [...todo.tasks, newTask]
                            }
                        }
                    }
                )
            };
        case 'CHANGE_TASK':
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: todo.tasks.map(task => {
                                if (task.id !== action.taskId) {
                                    return task
                                } else {
                                    return {
                                        ...task,
                                        ...action.obj
                                    }
                                }
                            })
                        }
                    }
                })
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todolists: state.todolists.filter(todo => todo.id !== action.todolistId)
            };
        case 'DELETE_TASK':
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: todo.tasks.filter(t => t.id !== action.taskId)
                        }
                    }
                })
            }
    }
    return state;
};

const store = createStore(reducer);

export default store