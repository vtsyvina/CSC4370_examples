import { Component } from '@angular/core';
import { TodoService, Todo } from '../service/todo.service';


@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.template.html'  
})
export class TodoListComponent{

    todos: Array<Todo>
    showAddTodo: boolean
    searchText: string
    theme: string = 'light'

    constructor(private todoService: TodoService){
        this.showAddTodo = false
        this.todos = this.todoService.todos
        this.todoService.getTodos().subscribe((d:Array<Todo>) =>{
            this.todos = d
            this.todoService.todos = d
            console.log(this.todos)
        })
    }

    todoAdded(added: boolean): void {
         added? this.showAddTodo = false : this.showAddTodo = true
    }
}

