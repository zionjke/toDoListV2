import {TaskType, TodoType, UpdateTaskType} from "../types/entities";

export const CREATE_TODOLIST = 'TODOLIST/APP/CREATE_TODOLIST';
export const CREATE_TASK = 'TODOLIST/APP/CREATE_TASK';
export const CHANGE_TASK = 'TODOLIST/APP/CHANGE_TASK';
export const DELETE_TODO = 'TODOLIST/APP/DELETE_TODO';
export const DELETE_TASK = 'TODOLIST/APP/DELETE_TASK';
export const SET_TODOLISTS = 'TODOLIST/APP/SET_TODOLISTS';
export const SET_TODOLISTS_TASKS = 'TODOLIST/APP/SET_TODOLISTS_TASKS';
export const CHANGE_TODO_TITLE = 'TODOLIST/APP/CHANGE_TODO_TITLE';


export type TodoActionTypes = CreateTodoActionType |
    CreateTaskActionType |
    UpdateTaskActionType |
    DeleteTodoActionType |
    DeleteTaskActionType |
    SetTodolistActionType |
    SetTasksActionType |
    ChangeTodoTitleActionType

type CreateTodoActionType = {
    type: typeof CREATE_TODOLIST
    newTodolist: TodoType
}
export const createTodoAC = (newTodolist: TodoType): CreateTodoActionType => {
    return {
        type: CREATE_TODOLIST,
        newTodolist
    }
};

type CreateTaskActionType = {
    type: typeof CREATE_TASK,
    todolistId: string,
    newTask: TaskType
}
export const createTaskAC = (newTask: TaskType, todolistId: string): CreateTaskActionType => {
    return {
        type: CREATE_TASK,
        newTask,
        todolistId
    }
};

type UpdateTaskActionType = {
    taskId: string,
    type: typeof CHANGE_TASK,
    obj: UpdateTaskType,
    todolistId: string
}

export const updateTaskAC = (taskId: string, obj: UpdateTaskType, todolistId: string): UpdateTaskActionType => {
    return {
        type: CHANGE_TASK,
        taskId: taskId,
        obj: obj,
        todolistId: todolistId
    }
};

type DeleteTodoActionType = {
    type: typeof DELETE_TODO,
    todolistId: string
}
export const deleteTodoAC = (todolistId: string): DeleteTodoActionType => {
    return {
        type: DELETE_TODO,
        todolistId: todolistId
    }
};

type DeleteTaskActionType = {
    type: typeof DELETE_TASK,
    taskId: string,
    todolistId: string
}
export const deleteTaskAC = (taskId: string, todolistId: string): DeleteTaskActionType => {
    return {
        type: DELETE_TASK,
        taskId: taskId,
        todolistId: todolistId
    }
};

type SetTodolistActionType = {
    type: typeof SET_TODOLISTS,
    todolists: Array<TodoType>
}
export const setTodoListAC = (todolists: Array<TodoType>): SetTodolistActionType => {
    return {
        type: SET_TODOLISTS,
        todolists
    }
};

type SetTasksActionType = {
    type: typeof SET_TODOLISTS_TASKS,
    todolistId: string,
    tasks: Array<TaskType>
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {
        type: SET_TODOLISTS_TASKS,
        todolistId,
        tasks
    }
};


type ChangeTodoTitleActionType = {
    type: typeof CHANGE_TODO_TITLE,
    todolistId: string,
    title: string
}
export const changeTodoTitleAC = (todolistId: string, title: string): ChangeTodoTitleActionType => {
    return {
        type: CHANGE_TODO_TITLE,
        todolistId,
        title
    }
};