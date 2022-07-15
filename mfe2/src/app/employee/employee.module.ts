import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee/employee.component';


@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
