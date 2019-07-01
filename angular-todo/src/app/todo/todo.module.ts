import { NgModule } from '@angular/core';
import { TodoListComponent } from './todo-list.component';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from './todo-card.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { TodoComponent } from './todo.component';
import { RouterModule } from '@angular/router';


@NgModule({
    // declares what components are in this module
    declarations: [
        TodoListComponent,
        TodoCardComponent,
        TodoComponent
    ],
    // defines what components from the module can be used outside of the modules
    exports: [
        TodoListComponent
    ],
    // what modules are needed for components inside this module to work
    imports : [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: [
        TodoService
    ]
})
export class TodoModule{

}