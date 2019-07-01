import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


/**
 * Is responsoble to get TODOs from the server
 */
@Injectable()
export class TodoService{
    todos : Array<Todo>

    /**
     * Will be called only once. Services are created for the whole life cycle of the application
     */
    constructor(private http: HttpClient){
        console.log("Create todo service")
    }

    /**
     * Sends the request to the server to get all available todos
     */
    getTodos() : Observable<Array<Todo>>{
        return this.http.get<Array<Todo>>("/api/v1/todo")
    }

    /**
     * Get todo by id. Does not call the server
     */
    getTodo(id) : Todo {
        var todo = this.todos.find(t => t.id == parseInt(id))
        console.log(todo)
        return todo
    }

    /**
     * Sends a todo to the server to add. Returns an observable with the response from the server
     * @param todo todo to add
     */
    addTodo(todo: Todo): Observable<Object>{
        return this.http.post('/api/v1/todo',todo)

    }
}

export class Todo{
    id: number
    title: string
    description: string
    date: number
}