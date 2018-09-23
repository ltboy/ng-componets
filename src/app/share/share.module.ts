import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    InputComponent,
    TestComponent,
  ],
  exports: [
    CommonModule,
    InputComponent,
    FormsModule,
    TestComponent,
  ]
})
export class ShareModule { }
