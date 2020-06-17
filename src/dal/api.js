import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "db79da77-d4ed-4333-9c43-3bf4d5e71c39"}
});


export const api = {
    createTodolist(title) {
        return instance.post('', {title: title}).then(response => response.data);
    },
    getTodolist() {
        return instance.get("",).then(response => response.data);
    },
    addTask(title, todoId) {
        return instance.post(`/${todoId}/tasks`, {title: title},).then(response => response.data)
    },

    getTasks(todoId) {
        return instance.get(`/${todoId}/tasks`).then(response => response.data)
    },

    deleteTodo(todoId) {
        return instance.delete(`/${todoId}`).then(response => response)
    },

    deleteTask(todoId,taskID) {
        return  instance.delete(`/${todoId}/tasks/${taskID}`).then(response => response)
    },

    changeTask(task,obj,todoId) {
        return instance.put(`/${todoId}/tasks/${task.id}`,
            {
                ...task,
                ...obj
            },
            )
            .then(response => response)
    }
}