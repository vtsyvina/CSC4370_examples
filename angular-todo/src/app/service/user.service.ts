import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService{

    user: User
    constructor(private http: HttpClient){

    }

    register(user: User, callback){
        this.http.post('/api/v1/users/register', user).subscribe(res=>{
            callback(res)
        })
    }

    login(user: User, callback){
        this.http.post('/api/v1/users/login', user).subscribe(res=>{
            console.log(res)
            callback(res)
        },
        err => {
            callback(undefined)
        })
    }

    logout( callback){
        this.http.get('/api/v1/users/logout').subscribe(r => callback())
    }

    checkLogIn(callback){
        this.http.get('/api/v1/users/isloggedin').subscribe((r: any) =>{
                this.user = r
                callback(r)
        },
        (error) => {
            console.log('Unauthorized')
            callback(undefined)
        })
    }
}

export class User{
    name: string
    email: string
    level: string
    id: string
    password: string
    password2: string
}