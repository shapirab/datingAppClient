import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class AcountService {
  baseUrl = 'https://localhost:7175/api/';
  //this is a special type of observable, that has an initial value. That
  //helps because we can check from anywhere in the app what is the currentUser without
  //needing to go to local storage
  private currentUserSource = new BehaviorSubject<UserDto | null>(null);
  //the $ is a convention to signify that this is an observable
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post<UserDto>(this.baseUrl + 'acount/login', model).pipe(
      map((response: UserDto) => {
        let user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model:any){
    return this.http.post<UserDto>(this.baseUrl + 'acount/register', model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        //if we want to see the user returned to us and we are using map we need to be explicit
        return user;
      })
    );
  }

  setCurrentUser(user: UserDto){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
