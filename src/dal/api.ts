import axios from "axios";
import {TaskType, TodoType, UpdateTaskType} from "../types/entities";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "db79da77-d4ed-4333-9c43-3bf4d5e71c39"}
});


type CommonResponseType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

type TasksResponseType = {
    items: Array<TaskType>
    totalCount:number
    error:string
}

export const api = {
    createTodolist(title:string) {
        return instance.post<CommonResponseType<{item:TodoType}>>('', {title: title});
    },
    getTodolists() {
        return instance.get<Array<TodoType>>("",);
    },
    createTask(title:string, todoId:string) {
        return instance.post<CommonResponseType<{item:TaskType}>>(`/${todoId}/tasks`, {title: title})
    },

    getTasks(todoId:string) {
        return instance.get<TasksResponseType>(`/${todoId}/tasks`);
    },

    deleteTodo(todoId:string) {
        return instance.delete<CommonResponseType<{}>>(`/${todoId}`)
    },

    deleteTask(todoId:string,taskID:string) {
        return  instance.delete<CommonResponseType<{}>>(`/${todoId}/tasks/${taskID}`)
    },

    changeTask(task:TaskType,obj:UpdateTaskType,todoId:string) {
        return instance.put<CommonResponseType<{item:TaskType}>>(`/${todoId}/tasks/${task.id}`,
            {
                ...task,
                ...obj
            },
            )
            
    },

    changeTodoTitle(todoId:string,title:string) {
        return instance.put<CommonResponseType<{}>>(`/${todoId}`,{title:title})
    }
};