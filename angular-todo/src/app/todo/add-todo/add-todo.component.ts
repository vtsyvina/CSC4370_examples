import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Todo, TodoService } from 'src/app/service/todo.service';
import { ErrorMessage } from 'src/app/error-messages-list/errors-list.component';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
    selector: 'add-todo',
    templateUrl: 'add-todo.template.html',
    animations: [
        trigger('openClose', [
          // ...
          state('open', style({
            height: '*',
            opacity: '1'
          })),
          state('closed', style({
            height: '0px',
            opacity: 0,
            visibility: 'hidden'
          })),
          transition('open => closed', [
            animate(600)
          ]),
          transition('closed => open', [
            animate('0.5s')
          ]),
        ]),
      ]
})
export class AddTodoComponent {
    todo: Todo
    errors: Array<ErrorMessage>
    @Output() todoAdded = new EventEmitter<boolean>()

    @Input() showAddTodo : boolean

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
                this.todo = new Todo
                this.todo.tasks = []
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