import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeesComponent,
    DepartmentsComponent,
    ProjectsComponent,
    PayrollComponent,
    AttendanceComponent,
    PerformanceComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    AboutComponent,
    ContactComponent,
    FaqsComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
