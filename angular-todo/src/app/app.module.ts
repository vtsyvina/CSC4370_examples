import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './notFound/not-found.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterModule } from './register/register.module';
import { ErrorsListModule } from './error-messages-list/errors-list.module';
import { UserService } from './service/user.service';
import { LoginModule } from './login/login.module';
import { FileSenderModule } from './file-sender/file-sender.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodoModule,
    RegisterModule,
    LoginModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ErrorsListModule,
    FileSenderModule
  ],
  providers: [HttpClient, HttpClientModule, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
