import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  founder: string = '';
  employees: any[] = [];
  departments: any[] = [];
  projects: any[] = [];
  leaves: any[] = [];
  payroll: any[] = [];
  notifications: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    debugger;

    // Founder
    this.http.get('http://localhost:3000/founderAndCEO', { responseType: 'text' })
      .subscribe(data => {
        this.founder = data;
        localStorage.setItem('founder', JSON.stringify(data));
        console.log("Founder:", data);
        alert(`Founder & CEO: ${data}`);
      });

    // Employees
    this.http.get<any[]>('http://localhost:3000/employees')
      .subscribe(data => {
        this.employees = data;
        localStorage.setItem('employees', JSON.stringify(data));
        console.log("Employees:", data);
      });

    // Departments
    this.http.get<any[]>('http://localhost:3000/departments')
      .subscribe(data => {
        this.departments = data;
        localStorage.setItem('departments', JSON.stringify(data));
        console.log("Departments:", data);
      });

    // Projects
    this.http.get<any[]>('http://localhost:3000/projects')
      .subscribe(data => {
        this.projects = data;
        localStorage.setItem('projects', JSON.stringify(data));
        console.log("Projects:", data);
      });

    // Leaves
    this.http.get<any[]>('http://localhost:3000/leaves')
      .subscribe(data => {
        this.leaves = data;
        localStorage.setItem('leaves', JSON.stringify(data));
        console.log("Leaves:", data);
      });

    // Payroll
    this.http.get<any[]>('http://localhost:3000/payroll')
      .subscribe(data => {
        this.payroll = data;
        localStorage.setItem('payroll', JSON.stringify(data));
        console.log("Payroll:", data);
      });

    // Notifications
    this.http.get<any[]>('http://localhost:3000/notifications')
      .subscribe(data => {
        this.notifications = data;
        localStorage.setItem('notifications', JSON.stringify(data));
        console.log("Notifications:", data);
        alert(`You have ${data.length} notifications.`);
      });
  }
}
