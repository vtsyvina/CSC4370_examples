import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorsListModule } from '../error-messages-list/errors-list.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';


@NgModule({
    declarations: [ LoginComponent],
    exports: [LoginComponent],
    imports: [
        RouterModule,
        ErrorsListModule,
        FormsModule
    ]
})
export class LoginModule{

}