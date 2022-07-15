import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
