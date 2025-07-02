import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  newPassword = '';
  confirmPassword = '';
  selectedImage: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    debugger;
    const userId = 1; // From auth/localStorage in real apps
    this.http.get<any>(`http://localhost:3000/users/${userId}`).subscribe(data => {
      this.user = data;
      console.log("Fetched Profile:", JSON.stringify(this.user));
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    this.selectedImage = URL.createObjectURL(file);
    this.user.profileImage = this.selectedImage;
  }

  updateProfile() {
    debugger;
    this.http.patch(`http://localhost:3000/users/${this.user.id}`, this.user).subscribe(() => {
      alert("✅ Profile Updated");
      console.log("Updated Profile:", JSON.stringify(this.user));
      localStorage.setItem("loggedUser", JSON.stringify(this.user));
    });
  }

  updatePassword() {
    debugger;
    if (this.newPassword !== this.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    this.http.patch(`http://localhost:3000/users/${this.user.id}`, {
      password: this.newPassword
    }).subscribe(() => {
      alert("✅ Password Updated");
      console.log("Updated Password:", this.newPassword);
    });
  }

  deleteProfile() {
    debugger;
    if (confirm("Are you sure you want to delete your profile?")) {
      this.http.delete(`http://localhost:3000/users/${this.user.id}`).subscribe(() => {
        alert("🗑️ Profile Deleted");
        localStorage.clear();
        window.location.href = '/register';
      });
    }
  }

  logout() {
    alert("👋 Logged out!");
    localStorage.clear();
    window.location.href = '/login';
  }
}
