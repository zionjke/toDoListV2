import {api} from "../dal/api";
import {
    CHANGE_TASK, CHANGE_TODO_TITLE,
    changeTodoTitleAC,
    CREATE_TASK, CREATE_TODOLIST, createTaskAC,
    createTodoAC, DELETE_TASK, DELETE_TODO,
    deleteTaskAC,
    deleteTodoAC, SET_TODOLISTS, SET_TODOLISTS_TASKS,
    setTasksAC,
    setTodoListAC, TodoActionTypes, updateTaskAC
} from "../actions/actions";
import {TaskType, TodoType, UpdateTaskType} from "../types/entities";
import {AppStateType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";


type InitialStateType = {
    todolists: Array<TodoType>
}

const initialState:InitialStateType = {
    todolists: []
};

const reducer = (state:InitialStateType = initialState, action:TodoActionTypes):InitialStateType => {
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(todo => {
                    return {
                        ...todo,
                        tasks: []
                    }
                })
            };
        case SET_TODOLISTS_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: action.tasks
                        }
                    }
                })
            };
        case CREATE_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };
        case CREATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                        if (todo.id !== action.todolistId) {
                            return todo
                        } else {
                            return {
                                ...todo,
                                tasks: [...todo.tasks, action.newTask]
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
        case CHANGE_TODO_TITLE: {
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            title: action.title
                        }
                    }
                })
            }
        }
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


// ThunkAction
// 1 параметр - описываем, что возвращает thunk
// 2 параметр - state всего приложения
// 3 параметр - экстра аргументы
// 4 параметр - все action всего App

// ThunkDispatch
// 1 параметр - state всего приложения
// 2 параметр - экстра аргументы
// 3 параметр - все action всего App


type ThunkType = ThunkAction<void,AppStateType,unknown,TodoActionTypes>

export const getTodoLists = ():ThunkType => (dispatch:ThunkDispatch<AppStateType,unknown,TodoActionTypes>) => {
    api.getTodolists().then(response => {
        dispatch(setTodoListAC(response.data))
    });
};


export const createTodoList = (title:string):ThunkType => (dispatch:ThunkDispatch<AppStateType,unknown,TodoActionTypes>) => {
    api.createTodolist(title).then(response => {
        dispatch(createTodoAC(response.data.data.item))
    });
};



export const getTodoTasks = (todoId:string):ThunkType => (dispatch:ThunkDispatch<AppStateType,unknown,TodoActionTypes>) => {
    api.getTasks(todoId).then(response => {
        dispatch(setTasksAC(todoId, response.data.items))
    })
};

export const addTask = (title:string, todoId:string):ThunkType => (dispatch:ThunkDispatch<AppStateType,unknown,TodoActionTypes>) => {
    api.createTask(title, todoId).then(response => {
        dispatch(createTaskAC(response.data.data.item,todoId))
    });
};

export const deleteTodoList = (todoId:string):ThunkType => (dispatch:ThunkDispatch<AppStateType,unknown,TodoActionTypes>) => {
    api.deleteTodo(todoId).then(() => {
        dispatch(deleteTodoAC(todoId))
    });
};

export const editTodoTitle = (todoId:string, title:string):ThunkType => (dispatch:ThunkDispatch<AppStateType,unknown,TodoActionTypes>) => {
    api.changeTodoTitle(todoId, title).then(() => {
        dispatch(changeTodoTitleAC(todoId, title))
    })
};

export const deleteTodoTask = (taskId:string, todoId:string):ThunkType => (dispatch:ThunkDispatch<AppStateType,unknown,TodoActionTypes>) => {
    api.deleteTask(todoId, taskId).then(() => {
        dispatch(deleteTaskAC(taskId, todoId))
    });
};

export const changeTodoTask = (task:TaskType, obj:UpdateTaskType, todoId:string):ThunkType => (dispatch:ThunkDispatch<AppStateType,unknown,TodoActionTypes>) => {
    api.changeTask(task, obj, todoId).then(() => {
        dispatch(updateTaskAC(task.id, obj, todoId))
    });
};


export default reducer