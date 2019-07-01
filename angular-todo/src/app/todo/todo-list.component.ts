import { Component } from '@angular/core';
import { TodoService, Todo } from '../service/todo.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'todo-list',
    template: `<todo-card *ngFor="let t of todos" [todo]="t"></todo-card>
        <button (click)="addTodo()" class="primary-button">Add todo now!</button>
    `
})
export class TodoListComponent{

    todos: Array<Todo>
    constructor(private todoService: TodoService){
        this.todoService.getTodos().subscribe((d:Array<Todo>) =>{
            this.todos = d
            this.todoService.todos = d
            console.log(this.todos)
        })
    }

    addTodo() : void {
        var todo = new Todo
        todo.date = new Date().getTime()
        todo.title = Math.random().toString()
        todo.description = Math.random().toString()
        // call the service and save returned id for the todo
        this.todoService.addTodo(todo).subscribe((r: any) =>{
            console.log(r)
            if (r.message == 'success'){
                todo.id = r.id
                this.todoService.todos.push(todo)
            }
        })
    }
}

