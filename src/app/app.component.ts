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
  
  constructor( private accountService : AcountService){}

  ngOnInit(): void {
    this.setCurrentUser();
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
