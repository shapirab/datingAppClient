import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { AcountService } from '../services/acount.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() isRegisterMode = new EventEmitter<boolean>();
  model: any = {};
  constructor(private accountService: AcountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: err => this.toastr.error(err.error)
    });
  }

  cancel(){
    this.isRegisterMode.emit(false);
  }

}
