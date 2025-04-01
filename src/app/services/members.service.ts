import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { Observable } from 'rxjs';
import { AcountService } from './acount.service';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private accountService: AcountService){}

  getMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username:string):Observable<Member>{
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  updateMember(updatedMember: Member){
    return this.http.put(`${this.baseUrl}users`, updatedMember);
  }
  // getMembers(): Observable<Member[]>{
  //   return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
  // }

  // getMember(username:string):Observable<Member>{
  //   return this.http.get<Member>(`${this.baseUrl}users/${username}`, this.getHttpOptions());
  // }

  // getHttpOptions(){
  //   let token: string | undefined;
  //   this.accountService.currentUser$.subscribe({
  //     next: res => {
  //       token = res?.token;
  //     }
  //   });
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${token}`
  //     })
  //   }
  // }
}
