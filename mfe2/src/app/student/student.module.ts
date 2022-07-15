import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student/student.component';


@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
