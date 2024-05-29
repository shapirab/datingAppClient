import { Component, OnInit } from '@angular/core';
import { AcountService } from '../services/acount.service';
import { error } from 'console';
import { Observable, of } from 'rxjs';
import { UserDto } from '../models/userDto';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  //loggedIn = false;
  //If we use the account service directly in the html we don't need this observable
  //currentUser$: Observable<UserDto | null> = of(null);//the of is Observable of type...
  constructor(public accountService: AcountService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
    //Instead we are going to asign
    //this.currentUser$ = this.accountService.currentUser$;
    //or we could make the account service public and use it directly in the html
  }

  getCurrentUser(){
    //the !! turns the user into a boolean, like if(user) return true
    //We are subscribing here to our own observable, but we do not unsubscribe.
    //To solve this we are going to use the async pipe on the html
    //For this we move away from the loggedIn property: we replace it with an observable
    // this.accountService.currentUser$.subscribe({
    //   next: user => this.loggedIn = !!user,
    //   error: err => console.log(err)
    // });
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
        //this.loggedIn = true;
      },
      error: err => this.toastr.error(err.error)

    });
  }

  logout(){
    //this.loggedIn = false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
