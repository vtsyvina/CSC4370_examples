import { Component } from '@angular/core';
import { ErrorMessage } from '../error-messages-list/errors-list.component';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent{
    name: string
    email: string
    password: string
    password2: string

    errors: Array<ErrorMessage>

    submitted = false;

    constructor(private userService: UserService, private router: Router){
           this.errors = []
    }

    onSubmit() { 
        console.log("submitted");
        var user = {
            email: this.email,
            password: this.password,
            name: undefined,
            password2: undefined,
            level: undefined,
            id: undefined
        }
        this.userService.login(user, (res)=>{
            this.router.navigate(["/"])
        } )
        this.submitted = true; }
}