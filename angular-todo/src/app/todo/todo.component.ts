import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Todo, TodoService } from '../service/todo.service';


@Component({
    selector: 'todo',
    templateUrl: 'todo.template.html'
})
export class TodoComponent {
    todo: Todo
    id
    constructor(private route: ActivatedRoute, private todoService: TodoService,
        private router: Router) {
        // get the id for todo to display from the URL
        this.id = route.snapshot.paramMap.get("id")
        //get the todo be parsed id
        this.todo = this.todoService.getTodo(this.id)
    }

    // get back to the home page
    goBack(): void {
        this.router.navigate(['/'])
    }
}