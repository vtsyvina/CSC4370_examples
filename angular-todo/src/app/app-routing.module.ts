import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { NotFoundComponent } from './notFound/not-found.component';

const routes: Routes = [
  // be default we show Todo list component
  {path: '', component: TodoListComponent},
  {path: 'todos', component: TodoListComponent},
  // when showing one todo we need to specify todo's id
  {path: 'todo/:id', component: TodoComponent},
  // for all other paths show Not Found component
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
