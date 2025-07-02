import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step = 1;
  email = '';
  otp = '';
  newPassword = '';
  confirmPassword = '';
  generatedOtp = '';
  matchedUserId: number | null = null;

  constructor(private http: HttpClient) {}

  sendOtp() {
    debugger;
    this.http.get<any[]>(`http://localhost:3000/users?email=${this.email}`).subscribe(users => {
      if (users.length > 0) {
        this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const user = users[0];
        this.matchedUserId = user.id;

        // Store OTP in backend
        this.http.patch(`http://localhost:3000/users/${user.id}`, { otp: this.generatedOtp }).subscribe(() => {
          alert(`✅ OTP sent: ${this.generatedOtp} (demo mode)`);
          console.log(`OTP: ${this.generatedOtp}`);
          localStorage.setItem("otpData", JSON.stringify({ email: this.email, otp: this.generatedOtp }));
          this.step = 2;
        });
      } else {
        alert('❌ Email not found!');
      }
    });
  }

  verifyOtp() {
    debugger;
    if (this.otp === this.generatedOtp) {
      alert('✅ OTP verified!');
      this.step = 3;
    } else {
      alert('❌ Invalid OTP!');
    }
  }

  resetPassword() {
    debugger;
    if (this.newPassword !== this.confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }

    const updatePayload = {
      password: this.newPassword,
      otp: ""
    };

    this.http.patch(`http://localhost:3000/users/${this.matchedUserId}`, updatePayload).subscribe(() => {
      alert('✅ Password successfully updated! Please login.');
      console.log('Password reset payload:', JSON.stringify(updatePayload));
      window.location.href = '/login';
    });
  }
}
