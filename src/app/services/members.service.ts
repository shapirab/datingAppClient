import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { AcountService } from './acount.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseUrl = environment.apiUrl;

  private membersSubject = new BehaviorSubject<Member[]>([]);
  members$ = this.membersSubject.asObservable();

  constructor(private http: HttpClient, private accountService: AcountService){}

  getMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      tap((members: Member[]) => {
        this.membersSubject.next(members);
      })
    );
  }

  getMember(username:string):Observable<Member>{
    let member = this.membersSubject.value.find(member => member.userName === username);
    if (member) {
      return of(member);
    }
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  updateMember(updatedMember: Member){
    return this.http.put(`${this.baseUrl}users`, updatedMember).pipe(
      tap(() => {
        let currentMembers = this.membersSubject.getValue();
        let updatedMembers = currentMembers.map(member =>
        member.userName === updatedMember.userName ? updatedMember : member
      );
      this.membersSubject.next(updatedMembers);
      })
    );
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
