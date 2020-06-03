export const CREATE_TODOLIST = 'CREATE_TODOLIST';
export const CREATE_TASK = 'CREATE_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_TASK = 'DELETE_TASK';

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
        case CREATE_TODOLIST:
            let newTodolist = {
                id: (new Date()).getTime(),
                title: action.title,
                tasks: []
            };
            return {
                ...state, // делаем копию стейта
                todolists: [...state.todolists, newTodolist] // ложим в тудулисты копию старых тудулистов и новый который пришел нам через экшн
            };
        case CREATE_TASK:
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
        case CHANGE_TASK:
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
        case DELETE_TODO:
            return {
                ...state,
                todolists: state.todolists.filter(todo => todo.id !== action.todolistId)
            };
        case DELETE_TASK:
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

 export const createTodoActionCreator = (title) => {
     return {
         type: CREATE_TODOLIST,
         title: title
     }
 };

 export const createTaskActionCreator = (newText,todolistId) => {
     return {
         type: CREATE_TASK,
         newText: newText,
         todolistId: todolistId
     }
 };

 export const changeTaskActionCreator = (taskId,obj,todolistId) => {
     return {
         type: CHANGE_TASK,
         taskId: taskId,
         obj: obj,
         todolistId: todolistId
     }
 };

 export const deleteTodoActionCreator = (todolistId) => {
     return {
         type: DELETE_TODO,
         todolistId: todolistId
     }
 };

 export const deleteTaskActionCreator = (taskId,todolistId) => {
     return {
         type: DELETE_TASK,
         taskId: taskId,
         todolistId: todolistId
     }
 }

 export default reducer