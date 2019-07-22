import { NgModule } from '@angular/core';
import { TodoListComponent } from './todo-list.component';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from './todo-card.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { TodoComponent } from './todo.component';
import { RouterModule } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoSearchPipe } from './pipes/todo-search.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';


@NgModule({
    // declares what components are in this module
    declarations: [
        TodoListComponent,
        TodoCardComponent,
        TodoComponent,
        AddTodoComponent,
        TodoSearchPipe,
        HighlightPipe
    ],
    // defines what components from the module can be used outside of the modules
    exports: [
        TodoListComponent
    ],
    // what modules are needed for components inside this module to work
    imports : [
        CommonModule,
        FormsModule,
        RouterModule,
        BrowserAnimationsModule
    ],
    providers: [
        TodoService
    ]
})
export class TodoModule{

}