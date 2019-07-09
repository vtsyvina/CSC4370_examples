import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { ErrorsListModule } from '../error-messages-list/errors-list.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [ RegisterComponent],
    exports: [RegisterComponent],
    imports: [
        RouterModule,
        ErrorsListModule,
        FormsModule
    ]
})
export class RegisterModule{

}