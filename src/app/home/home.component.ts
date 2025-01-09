import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: User[] | undefined;
  url = 'https://localhost:7175/api/users';
  constructor() { }
  // constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  // getUsers(){
  //   this.http.get(this.url).subscribe({
  //     next: res => this.users = res as User[],
  //     error: err => console.log(err)
  //   });
  // }

  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }

}
