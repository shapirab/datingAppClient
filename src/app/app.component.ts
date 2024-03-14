import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { error } from 'console';
import { AcountService } from './services/acount.service';
import { UserDto } from './models/userDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  users: User[] | undefined;
  url = 'https://localhost:7175/api/users';
  constructor(private http: HttpClient, private accountService : AcountService){}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.http.get(this.url).subscribe({
      next: res => this.users = res as User[],
      error: err => console.log(err)
    });
  }

  setCurrentUser(){
    let userString = localStorage.getItem('user');
    if(!userString){
      return;
    }
    let user: UserDto = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
