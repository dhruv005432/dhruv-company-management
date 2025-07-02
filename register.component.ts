import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    captcha: '',
    department: ''
  };

  departments: string[] = [];
  captcha = this.generateCaptcha();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  generateCaptcha(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  loadDepartments(): void {
    this.http.get<any[]>('http://localhost:3000/departments').subscribe(data => {
      this.departments = data.map(d => d.name);
    });
  }

  register(): void {
    debugger;

    if (this.form.captcha !== this.captcha) {
      alert('❌ Invalid Captcha!');
      this.captcha = this.generateCaptcha();
      return;
    }

    if (this.form.password !== this.form.confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }

    const newUser = {
      firstName: this.form.firstName,
      middleName: this.form.middleName,
      lastName: this.form.lastName,
      email: this.form.email,
      contact: this.form.contact,
      username: this.form.email.split('@')[0], // example username
      password: this.form.password,
      role: 'employee',
      department: this.form.department || 'Unassigned'
    };

    console.log('📝 Registering User:', newUser);
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    this.http.post('http://localhost:3000/users', newUser).subscribe(() => {
      alert('✅ Registration Successful! Redirecting to Login...');
      this.router.navigate(['/login']);
    });
  }
}
