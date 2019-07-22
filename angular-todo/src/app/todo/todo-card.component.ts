import { Component, Input, OnInit } from '@angular/core';
import { TodoService, Todo } from '../service/todo.service';

@Component({
    selector: 'todo-card',
    templateUrl : './todo-card.template.html',
    styleUrls : ['./todo-card.style.css']
})
export class TodoCardComponent implements OnInit{
    
    @Input()
    todo : Todo
    @Input()
    searchText: string
    @Input()
    theme: string
    date: Date
    message: string
    
    constructor(private todoService: TodoService){
        // this.date == undefined here!
    }

    /*
    *   It is important to remember component lifecycle
    */
    ngOnInit(): void {
        this.date = new Date(this.todo.date);
    }

    deleteTodo(): void {
        console.log('delete')
        this.todoService.deleteTodo(this.todo.id).subscribe((res) =>{
            if (res.message == 'success'){
                var index = this.todoService.todos.findIndex(t => t.id == this.todo.id)
                this.todoService.todos.splice(index, 1);
            }
        });
    }

}