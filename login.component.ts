import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    identifier: '', // email or contact
    password: '',
    captcha: ''
  };

  captcha = this.generateCaptcha();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  generateCaptcha(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  login(): void {
    debugger;

    if (this.form.captcha !== this.captcha) {
      alert('❌ Invalid Captcha!');
      this.captcha = this.generateCaptcha();
      return;
    }

    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
      const user = users.find(u =>
        (u.email === this.form.identifier || u.contact === this.form.identifier) &&
        u.password === this.form.password
      );

      console.log('🔍 User Attempt:', JSON.stringify(this.form));

      if (user) {
        alert(`✅ Login Success! Redirecting to ${user.role} dashboard.`);
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Role-based redirect
        switch (user.role) {
          case 'admin':
            this.router.navigate(['/dashboard']);
            break;
          case 'hr':
            this.router.navigate(['/employees']);
            break;
          case 'employee':
            this.router.navigate(['/profile']);
            break;
          default:
            this.router.navigate(['/home']);
        }
      } else {
        alert('❌ Invalid email/contact or password!');
      }
    });
  }

  oneTimeLogin(provider: string): void {
    alert(`🔐 Redirecting to ${provider} login... (mock)`);
    console.log(`${provider} login clicked`);
  }
}
