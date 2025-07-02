import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // 🔄 Redirect to Home
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'payroll', component: PayrollComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: '**', component: NotFoundComponent } // ⚠️ 404 fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
