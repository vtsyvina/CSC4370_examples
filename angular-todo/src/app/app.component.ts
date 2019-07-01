import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message : string
  title = 'angular-todo';

  constructor(){
    this.message = "Start message"
  }

  buttonClick() : void {
    console.log(this.message)
  }
}
