import { Component, Input } from '@angular/core';
import { TodoService, Todo } from '../service/todo.service';

@Component({
    selector: 'todo-card',
    templateUrl : './todo-card.template.html',
    styleUrls : ['./todo-card.style.css']
})
export class TodoCardComponent{
    @Input()
    todo : Todo
    message: string
    
    constructor(private todoService: TodoService){

    }

    changeTodo(): void {
        this.todo.title = this.todo.title + " clicked"
    }
}