import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { AcountService } from '../services/acount.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() isRegisterMode = new EventEmitter<boolean>();
  model: any = {};
  constructor(private accountService: AcountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: err => console.log(err)
    });
  }

  cancel(){
    this.isRegisterMode.emit(false);
  }

}
