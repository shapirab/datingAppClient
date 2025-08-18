import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule, NgControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    console.log('textInputComponent::constructor().', this)
   }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  ngOnInit(): void {
  }

  get control(): FormControl{
    return this.ngControl.control as FormControl;
  }

}
