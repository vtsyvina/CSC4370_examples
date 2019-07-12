import { Component, Output, EventEmitter } from '@angular/core';
import { Todo, TodoService } from 'src/app/service/todo.service';
import { ErrorMessage } from 'src/app/error-messages-list/errors-list.component';



@Component({
    selector: 'add-todo',
    templateUrl: 'add-todo.template.html'
})
export class AddTodoComponent {
    todo: Todo
    errors: Array<ErrorMessage>
    @Output() todoAdded = new EventEmitter<boolean>()

    constructor(private todoService: TodoService) {
        console.log("add todo")
        this.todo = new Todo
        this.todo.tasks = []
    }

    addTodo(): void {
        this.todo.date = new Date().getTime()
        this.todoService.addTodo(this.todo).subscribe(res => {
            if (res.message == 'success') {
                this.todoAdded.emit(true)
                this.todo.id = res.id
                this.todoService.todos.push(this.todo)
            } else {
                this.todoAdded.emit(false)
                this.errors.push({ type: 'danger', message: "Add todo failed" })
            }
        })
    }

    addTask(): void {
        this.todo.tasks.push({ description: "" })
    }
}