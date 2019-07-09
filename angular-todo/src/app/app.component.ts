import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message : string
  title = 'angular-todo';

  constructor(private userService: UserService, private router: Router){
    this.message = "Start message"
    this.userService.checkLogIn((user) =>{
      if (!user){
        router.navigate(['/users/login'])
      } else{
        
      }
    })
  }

  buttonClick() : void {
    console.log(this.message)
  }

  logout(){
    this.userService.logout(()=>{
        this.router.navigate(['users/login'])
    })
  }
}
