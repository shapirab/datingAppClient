import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { AcountService } from '../services/acount.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() isRegisterMode = new EventEmitter<boolean>();
  //model: any = {};
  registerForm: FormGroup = new FormGroup({});
  fb: FormBuilder = new FormBuilder();
  maxDate: Date = new Date();


  constructor(private accountService: AcountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm(){
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required, this.matchValues('password'), Validators.minLength(4), Validators.maxLength(8)])
    // });

    this.registerForm = this.fb.group({
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password'), Validators.minLength(4), Validators.maxLength(8)]]
    })

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo:string): ValidatorFn{
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    };
  }

  // register(){
  //   this.accountService.register(this.model).subscribe({
  //     next: response => {
  //       console.log(response);
  //       this.cancel();
  //     },
  //     error: err => this.toastr.error(err.error)
  //   });
  // }
  register(){
    console.log('registerComponent::register(). values: ', this.registerForm.value)
  }

  cancel(){
    this.isRegisterMode.emit(false);
  }

}
