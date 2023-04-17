import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {




  users: any = [];
  handlerUser(eve: any) {
    this.users.push(eve);
  }
  deleteUser(eve: any) {
    this.users.splice(eve, 1);
  }

  editUser(eve: any) {
    this.users[eve].username = prompt('enter your name');
    this.users[eve].email = prompt('enter your email');
  }
  
}
