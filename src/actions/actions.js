export const CREATE_TODOLIST = 'TODOLIST/REDUCER/CREATE_TODOLIST';
export const CREATE_TASK = 'TODOLIST/REDUCER/CREATE_TASK';
export const CHANGE_TASK = 'TODOLIST/REDUCER/CHANGE_TASK';
export const DELETE_TODO = 'TODOLIST/REDUCER/DELETE_TODO';
export const DELETE_TASK = 'TODOLIST/REDUCER/DELETE_TASK';
export const SET_TODOLISTS = 'TODOLIST/REDUCER/SET_TODOLISTS';
export const SET_TODOLISTS_TASKS = 'TODOLIST/REDUCER/SET_TODOLISTS_TASKS';
export const CHANGE_TODO_TITLE = 'TODOLIST/REDUCER/CHANGE_TODO_TITLE';

export const createTodo = (newTodolist) => {
    return {
        type: CREATE_TODOLIST,
        newTodolist
    }
};

export const createTask = (newTask, todolistId) => {
    return {
        type: CREATE_TASK,
        newTask,
        todolistId
    }
};

export const updateTask = (taskId, obj, todolistId) => {
    return {
        type: CHANGE_TASK,
        taskId: taskId,
        obj: obj,
        todolistId: todolistId
    }
};

export const deleteTodo = (todolistId) => {
    return {
        type: DELETE_TODO,
        todolistId: todolistId
    }
};

export const deleteTask = (taskId, todolistId) => {
    return {
        type: DELETE_TASK,
        taskId: taskId,
        todolistId: todolistId
    }
};

export const setTodoList = (todolists) => {
    return {
        type: SET_TODOLISTS,
        todolists
    }
};

export const setTasks = (todolistId,task) => {
    return{
        type: SET_TODOLISTS_TASKS,
        todolistId,
        task
    }
};

export const changeTodoTitle =(todolistId,title) => {
    return {
        type: CHANGE_TODO_TITLE,
        todolistId,
        title
    }
};