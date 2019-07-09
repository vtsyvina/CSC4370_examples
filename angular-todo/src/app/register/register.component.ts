import { Component } from '@angular/core';
import { ErrorMessage } from '../error-messages-list/errors-list.component';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.template.html'
})
export class RegisterComponent{
    name: string
    email: string
    password: string
    password2: string

    errors: Array<ErrorMessage>

    constructor(private userService: UserService, private router: Router){
           this.errors = []
    }

    register(){
        console.log("register")
        this.errors = []
        if (this.password != this.password2){
            this.errors.push({message:"Passwords are not the same", type:"danger"})
        }
        if (this.password.length < 6){
            this.errors.push({message:"Passwords should be at least 6 characters long", type:"danger"})
        }
        if (this.errors.length > 0){
            return;
        }
        var user = {
            name: this.name,
            email: this.email,
            password: this.password,
            password2: this.password2,
            id: undefined,
            level: undefined
        }
        this.userService.register(user, (res) =>{
            this.router.navigate(['/users/login']);
        })
    }
}