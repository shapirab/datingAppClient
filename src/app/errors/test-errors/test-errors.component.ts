import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl:string = 'https://localhost:7175/api/';
  validationErrors: string[] = [];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get400Error(){
    this.http.get(`${this.baseUrl}buggy/bad-request`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }
  get401Error(){
    this.http.get(`${this.baseUrl}buggy/auth`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }
  get404Error(){
    this.http.get(`${this.baseUrl}buggy/not-found`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }
  get500Error(){
    this.http.get(`${this.baseUrl}buggy/server-error`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }
  getValidationError(){
    this.http.get(`${this.baseUrl}Acount/register`, {}).subscribe({
      next: res => console.log(res),
      error: err => {
        console.log(err);
        this.validationErrors = err;
        console.log('validationErrors:')
        console.log(this.validationErrors)
      }
    });
  }

}
